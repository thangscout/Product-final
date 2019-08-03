const multer = require('multer');
const path = require('path');

const PATH_STORAGE_IMAGE = path.resolve(__dirname, '../public/images');

const storage = multer.diskStorage({
  destination: ( req, file, cb) =>{
    cb(null, PATH_STORAGE_IMAGE);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const uploadImage = multer({ storage });

module.exports = uploadImage;
