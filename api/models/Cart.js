const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  id: { type: String, required: true },
  cartData: { type: Object, required: true },
});
module.exports = mongoose.model("Cart", CartSchema);
