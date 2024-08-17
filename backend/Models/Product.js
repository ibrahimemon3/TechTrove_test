const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: { type: String, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  image: { type: String }, // URL for the uploaded image
});

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;
