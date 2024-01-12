const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        resource_type: 'raw',
        folder: 'document',
        format: async (req, file) => {
            const ext = file.originalname.split('.').pop().toLowerCase();
          
            if (ext === 'txt') {
              return 'txt';
            } else if (ext === 'docx' || ext === 'doc') {
              return 'docx';
            } else {
              return 'raw';
            }
          },
    },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
