// config/ cloudinary.js

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'toolshare/tools', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png', 'jpeg'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

// for later work on uplading images to folders for each user
// var storage2 = cloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: function (req, file, cb) {
//     cb(null, `toolshare/tools/${req.}`);
//   }, // The name of the folder in cloudinary
//   allowedFormats: ['jpg', 'png', 'jpeg'],
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
//   }
// });

const uploadCloudTool = multer({ storage: storage });
// const uploadCloudTool = multer({ storage: storage2 });

module.exports = uploadCloudTool;