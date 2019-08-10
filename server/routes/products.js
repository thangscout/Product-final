const express = require('express');
const router = express.Router();
const path = require('path');

const Product = require('../models/product');
const Category = require('../models/category');
const { UPLOAD_IMAGE_PRODUCT } = require('../utils/upload-image');
const { REMOVE_IMAGE } = require('../utils/remove-img');


//Get list product
router.get('/', async (req, res) => {
  try {
    let products = await Product.find({})
      .populate({
        path:'category',
        select:'title'
      })
      .sort({ createAt: -1});
    if(!products) res.json({ error: true, message: 'CANNOT_GET_PRODUCTS'});
    
    setTimeout(()=> {
      res.json({error: false, data: products});
    }, 1500);
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
});

//Get info a product
router.get('/:productID', async (req, res) => {
  try {
    const { productID} = req.params;
    let isExist = await Product.findById(productID);
    if(!isExist) res.json({ error: true, message: 'PRODUCT_NOT_EXIST'});

    let infoProduct = await Product.findById(productID);
    if(!infoProduct) res.json({ error: true, message: 'CANNOT_GET_INFO_PRODUCT'});

    setTimeout(()=> {
      res.json({ error: false, data: infoProduct});
    }, 1500);
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
})

//Create a product
router.post('/', UPLOAD_IMAGE_PRODUCT.single('image'), async (req, res) => {
  try {
    const { title, description, price, categoryID } = req.body;
    let isExist = await Product.findOne({title});
    if(isExist) res.json({ error: true, message: 'PRODUCT_IS_EXIST'});

    const objProduct = { title, description, price, category: categoryID };
    if(req.file){
      let { originalname } = req.file;
      objProduct.image = originalname;
    }

    let initInfoProduct = new Product(objProduct);
    let infoProductInserted = await initInfoProduct.save();
    if(!infoProductInserted) res.json({ error: true, message: 'CANNOT_INSERT_PRODUCT'});

    let {_id: productID} = infoProductInserted;
    let infoCategoryAfterUpdate = await Category.findByIdAndUpdate(categoryID, {
      $addToSet: {products: productID}
    }, { new: true});

    if(!infoCategoryAfterUpdate) res.json({ error: true, message: 'CANNOT_INSERT_CATEGORY_FOR_PRODUCT'});

    let categories = await Category.find({})
    if(!categories) res.json({ error: true, message: 'CANNOT_GET_CATEGORIES'})

    setTimeout(()=> {
      res.json({ error: false, newProduct: infoProductInserted, newCategory: infoCategoryAfterUpdate, categories});
    }, 1500);
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
});

//Update a product
router.put('/:productID', UPLOAD_IMAGE_PRODUCT.single('image'), async (req, res) => {
  try {
    const { productID } = req.params;
    let isExist = await Product.findById(productID);
    if(!isExist) res.json({ error: true, message: 'PRODUCT_NOT_EXIST'});

    const {title, description, price, categoryID } = req.body;
    
    if(!Object.is(isExist.category, categoryID)){
      let infoOldCategory = await Category.findByIdAndUpdate(isExist.category, {
        $pull: {products: productID}
      }, { new: true});
    }

    const objProductUpdate = { title, description, price, category: categoryID};
    if(req.file){
      let { originalname } = req.file;
      objProductUpdate.image = originalname;
    }

    let infoProductUpdated = await Product.findByIdAndUpdate(productID, objProductUpdate, { new: true});
    if(!infoProductUpdated) res.json({ error: true, message: 'CANNOT_UPDATE_PRODUCT'});

    let infoCategoryAfterUpdate = await Category.findByIdAndUpdate(categoryID, {
      $addToSet: {products: productID}
    }, { new: true});
    if(!infoCategoryAfterUpdate) res.json({ error: true, message: 'CANNOT_UPDATE_CATEGORY_FOR_PRODUCT'});
    
    setTimeout(()=> {
      res.json({ error: false, productUpdated: infoProductUpdated, categoryUpdated: infoCategoryAfterUpdate});
    }, 1500);
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
});

// Delete a product
router.delete('/:productID', async (req, res) => {
  try {
    const { productID } = req.params;
    let isExist = await Product.findById(productID);
    if(!isExist) res.json({ error: true, message: 'PRODUCT_NOT_EXIST'});

    let infoProductHasDeleted = await Product.findByIdAndRemove(productID);
    if(!infoProductHasDeleted) res.json({ error: true, message: 'CANNOT_REMOVE_PRODUCT'});

    let infoNewCategory = await Category.findByIdAndUpdate(isExist.category, {
      $pull: {products: productID}
    }, { new: true});

    //Remove image for user
    let imagePathRemove = path.resolve(__dirname, `../public/images/products/${infoProductHasDeleted.image}`);
    let result = await REMOVE_IMAGE(imagePathRemove);

    setTimeout(()=> {
      res.json({ error: false, data: infoProductHasDeleted});
    }, 1500);
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
})

//Export router
exports.PRODUCT_ROUTER = router;