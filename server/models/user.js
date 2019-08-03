const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: { type: String, required: true, trim: true},
  email: { type: String, required: true, trim: true, unique: true},
  password: { type: String, required: true, trim: true},
  age: { type: Number},
  image: { type: String},
  createAt: { type: Date, default: Date.now}
});

const User = mongoose.model('user', userSchema);

module.exports = User;