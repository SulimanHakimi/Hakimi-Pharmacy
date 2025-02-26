const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Array, required: true },
  inStock: { type: Boolean, required: true },
  stockQuantity: { type: Number, required: true },
  images: { type: Array, required: true },
});
module.exports = mongoose.model("Product", ProductSchema);
