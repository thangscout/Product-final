const jwt = require('jsonwebtoken');

const KEY = 'MERNSTACK';

const signPromise = objData => {
  return new Promise( resolve => {
    try {
      jwt.sign(objData, KEY, (err, token) => {
        if(err) resolve({ error: true, message: err.message });
        resolve({ error: false, token });
      })
    } catch (error) {
      return resolve({ error: true, message: error.message});
    }
  })
}

const verifyPromise = token => {
  return new Promise( resolve => {
    try {
      jwt.verify(token, KEY, (err, data) => {
        if(err) resolve({ error: true, message: err.message});
        resolve({ error: false, data });
      })
    } catch (error) {
      return resolve({ error: true, message: error.message});
    }
  })
}

module.exports = {
  signPromise, verifyPromise
}