const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { cart, orderAddress, user } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty or invalid" });
    }

    if (!orderAddress || typeof orderAddress !== "object") {
      return res
        .status(400)
        .json({ message: "Order address is missing or invalid" });
    }

    const newOrder = new Order({
      items: cart.map((item) => ({
        product: item.product,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress: orderAddress,
      user: user,
    });

    newOrder.totalPrice = newOrder.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder._id);
  } catch (err) {
    console.error("Error creating order:", err);
    res
      .status(500)
      .json({ message: "Error creating order", error: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product");
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err });
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error updating order", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting order", error: err });
  }
});

module.exports = router;
