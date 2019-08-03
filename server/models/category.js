const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: { type: String, required: true, trim: true, unique: true},
  description: { type: String, required: true, trim: true},
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'product'
    }
  ],
  createAt: { type: Date, default: Date.now}
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;