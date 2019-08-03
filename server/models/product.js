const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true, trim: true, unique: true},
  description: { type: String, required: true, trim: true},
  price: { type: Number, required: true},
  image: { type: String},
  createAt: { type: Date, default: Date.now}
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;