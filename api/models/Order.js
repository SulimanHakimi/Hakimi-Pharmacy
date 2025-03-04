const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
      },
      price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be less than 0"],
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: [0, "Total price cannot be less than 0"],
  },
  status: {
    type: String,
    enum: ["در انتظار برسی", "تایید شد", "ارسال شد", "تحویل داده شد", "لغو شد"],
    default: "در انتظار برسی",
  },
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Order", orderSchema);
