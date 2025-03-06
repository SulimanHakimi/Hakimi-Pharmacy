const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { verifyTokenAndAdmin } = require("./middleware");

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find().sort({ createdAt: -1 });
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving carts", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving cart" });
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error updating cart", error: err });
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting cart", error: err });
  }
});

module.exports = router;
