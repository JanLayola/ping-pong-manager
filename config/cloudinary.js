'use strict';
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
  cloud_name: 'difs0ml4w',
  api_key: '647633361623766',
  api_secret: 'ghbVoZtWQ_4MJiA-IxK1WR7gTt8'
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'luxify',
  allowedFormats: ['jpg', 'png']
});
const parser = multer({ storage: storage });
module.exports = parser;
