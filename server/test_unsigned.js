const uploadUnsigned = async () => {
  const formData = new FormData();
  // Provide a base64 image
  formData.append('file', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==');
  formData.append('upload_preset', 'vinayak');

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/dphjfsqir/image/upload', {
      method: 'POST',
      body: formData
    });
    
    if (res.ok) {
      const data = await res.json();
      console.log('Unsigned upload success:', data.secure_url);
    } else {
      const text = await res.text();
      console.error('Unsigned upload failed:', res.status, text);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
};

uploadUnsigned();
