const multer = require('multer');
const path = require('path');

const PATH_IMAGE_USER = path.resolve(__dirname, '../public/images/users');
const PATH_IMAGE_PRODUCT = path.resolve(__dirname, '../public/images/products');

const storageImageUser = multer.diskStorage({
  destination: ( req, file, cb) =>{
    cb(null, PATH_IMAGE_USER);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const uploadImageUser = multer({ storage: storageImageUser });

const storageImageProduct = multer.diskStorage({
  destination: ( req, file, cb) =>{
    cb(null, PATH_IMAGE_PRODUCT);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const uploadImageProduct = multer({ storage: storageImageProduct });

module.exports = { UPLOAD_IMAGE_USER: uploadImageUser, UPLOAD_IMAGE_PRODUCT: uploadImageProduct};
