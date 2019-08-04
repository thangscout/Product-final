const express = require('express');
const router = express.Router();
const { hash, compare } = require('bcrypt');
const path = require('path');

const User = require('../models/user');
const { UPLOAD_IMAGE_USER } = require('../utils/upload-image');
const { REMOVE_IMAGE } = require('../utils/remove-img');

//Get list user
router.get('/', async ( req, res) => {
  try {
    let users = await User.find({})
      .sort({ createAt: -1});
    if(!users) res.json({ error: true, message: 'CANNOT_GET_USERS'});

    res.json({error: false, users});
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
});

//Get info a user
router.get('/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    let isExist = await User.findById(userID);
    if(!isExist) res.json({ error: true, message: 'USER_NOT_EXIST'});

    let infoUser = await User.findById(userID);
    if(!infoUser) res.json({ error: true, message: 'CANNOT_GET_INFO_USER'});

    res.json({ error: false, data: infoUser});
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
})

//Register a user
router.post('/', UPLOAD_IMAGE_USER.single('image'), async (req, res) => {
  try {
    const { fullname, email, password, age } = req.body;

    let isExist = await User.findOne({email})
    if(isExist) res.json({ error: true, message: 'USER_IS_EXIST'});

    let passHash = await hash(password, 8);
    if(!passHash) res.json({ error: true, message: 'CANNOT_HASH_PASSWORD'});

    const objUser = { fullname, email, password: passHash, age };
    if(req.file){
      const { originalname } = req.file;
      objUser.image = originalname;
    }

    let initInfoUser = new User(objUser);
    let infoUserInserted = await initInfoUser.save();

    if(!infoUserInserted) res.json({ error: true, message: 'CANNOT_INSERT_USER'});

    res.json({ error: false, data: infoUserInserted });
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
});

//Update info user
router.put('/:userID', UPLOAD_IMAGE_USER.single('image'), async (req, res) => {
  try {
    const { userID } = req.params;
    let isExist = await User.findById(userID);
    if(!isExist) res.json({ error: true, message: 'USER_NOT_EXIST'});

    const { fullname, email, password, age} = req.body;

    let passHash = await hash(password, 8);
    if(!passHash) res.json({ error: true, message: 'CANNOT_HASH_PASSWORD'});

    const objUserUpdate = { fullname, email, password: passHash, age};
    if(req.file){
      const { originalname } = req.file;
      objUserUpdate.image = originalname;
    }

    let infoUserUpdated = await User.findByIdAndUpdate(userID, objUserUpdate, { new: true});
    if(!infoUserUpdated) res.json({error: true, message: 'CANNOT_UPDATE_USER'});

    res.json({ error: false, data: infoUserUpdated });
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
});

//Delete a user
router.delete('/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    let isExist = await User.findById(userID);
    if(!isExist) res.json({ error: true, message: 'USER_NOT_EXIST'});
    
    let infoUserHasDeleted = await User.findByIdAndRemove(userID);
    if(!infoUserHasDeleted) res.json({ error: true, message: 'CANNOT_REMOVE_USER'});

    //Remove image for user
    let imagePathRemove = path.resolve(__dirname, `../public/images/users/${infoUserHasDeleted.image}`);
    let result = await REMOVE_IMAGE(imagePathRemove);

    res.json({ error: false, data: infoUserHasDeleted});
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
})

//Export router
exports.USER_ROUTER = router;