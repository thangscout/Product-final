const fs = require('fs');

const removeImage = (imagePathRemove) => {
  return new Promise( resolve => {
    try {
      fs.unlink(imagePathRemove, err => {
        if(err) return resolve({ err: true, message: err.message});
        console.log({ imagePathRemove})
        return resolve({ error: false, message: 'REMOVE_FILE_SUCCESSED'});
      })
    } catch (error) {
      return resolve({ error: true, message: error.message});
    }
  })
};

exports.REMOVE_IMAGE = removeImage;