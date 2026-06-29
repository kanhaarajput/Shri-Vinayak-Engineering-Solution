const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dphjfsqir',
  api_key: '494163219384149',
  api_secret: '6Zacf-O2fyCiexaSNiOTMNd0EOY',
});

cloudinary.uploader.upload('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', {
  // upload_preset: 'vinayak' // Intentionally omitted to test signed upload
})
.then(result => console.log('Signed upload success:', result.secure_url))
.catch(err => console.error('Signed upload error:', err));

cloudinary.uploader.upload('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', {
  upload_preset: 'vinayak'
})
.then(result => console.log('Preset upload success:', result.secure_url))
.catch(err => console.error('Preset upload error:', err));
