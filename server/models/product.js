const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true, trim: true, unique: true},
  description: { type: String, required: true, trim: true},
  price: { type: Number, required: true},
  image: { type: String},
  // category: { type: String, default: 'uncategorized'},
  categoryID: { 
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  createAt: { type: Date, default: Date.now}
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;