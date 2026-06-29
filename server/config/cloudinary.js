const multer = require('multer');

// Custom storage engine for Unsigned Cloudinary Uploads
class CloudinaryUnsignedStorage {
  constructor(opts) {
    this.cloudName = opts.cloudName;
    this.uploadPreset = opts.uploadPreset;
  }

  _handleFile(req, file, cb) {
    const chunks = [];
    file.stream.on('data', chunk => chunks.push(chunk));
    file.stream.on('end', async () => {
      const buffer = Buffer.concat(chunks);
      const base64Data = buffer.toString('base64');
      const dataUri = `data:${file.mimetype};base64,${base64Data}`;
      
      const formData = new FormData();
      formData.append('file', dataUri);
      formData.append('upload_preset', this.uploadPreset);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          const text = await response.text();
          return cb(new Error(`Cloudinary upload failed: ${response.status} ${text}`));
        }

        const data = await response.json();
        // Mimic multer-storage-cloudinary output
        cb(null, {
          path: data.secure_url,
          filename: data.public_id,
          size: data.bytes
        });
      } catch (err) {
        cb(err);
      }
    });
    
    file.stream.on('error', err => cb(err));
  }

  _removeFile(req, file, cb) {
    // Cannot easily delete unsigned uploads without signed API credentials
    cb(null);
  }
}

const storage = new CloudinaryUnsignedStorage({
  cloudName: 'dphjfsqir',
  uploadPreset: 'vinayak'
});

const upload = multer({ storage: storage });

module.exports = { upload };
