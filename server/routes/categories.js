const express = require('express');
const router = express.Router();

const Category = require('../models/category');

//Get list category
router.get('/', async (req, res) => {
  try {
    let categories = await Category.find({})
      .populate('products')
      .sort({ createAt: -1});
    if(!categories) res.json({ error: true, message: 'CANNOT_GET_CATEGORIES'});

    res.json({ error: false, categories });
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
});

//Get info a category
router.get('/:categoryID', async (req, res) => {
  try {
    const { categoryID } = req.params;
    let infoCategory = await Category.findById(categoryID);
    if(!infoCategory) res.json({ error: true, message: 'CANNOT_GET_INFO_CATEGORY'});

    res.json({ error: false, data: infoCategory})
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
});

//Create a category
router.post('/', async (req, res) => {
  try {
    const { title, description, } = req.body;
    let isExits  = await Category.findOne({ title });
    if(isExits) res.json({ error: true, message: 'CATEGORY_IS_EXIST'});

    let infoCategory = new Category({title, description});
    let infoCategoryInserted = await infoCategory.save();
    if(!infoCategoryInserted) res.json({ error: true, message: 'CANNOT_INSERT_CATEGORY'});

    res.json({ error: false, data: infoCategoryInserted});
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
});

//Update a category
router.put('/:categoryID', async (req, res) => {
  try {
    const { categoryID } = req.params;
    const { title, description} = req.body;

    let infoCategory = await Category.findByIdAndUpdate(categoryID, {
      title, description
    }, { new: true});
    if(!infoCategory) res.json({ error: true, message: 'CANNOT_UPDATE_CATEGORY'});

    res.json({ error: false, data: infoCategory });    
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
});

//Delete a category
router.delete('/:categoryID', async (req, res) => {
  try {
    const { categoryID } = req.params;
    let infoCategoryHasDeleted = await Category.findByIdAndRemove(categoryID);
    if(!infoCategoryHasDeleted) res.json({ error: true, message: 'CANNOT_REMOVE_CATEGORY'});

    res.json({ error: false, data: infoCategoryHasDeleted });
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
})

exports.CATEGORIES_ROUTER = router;