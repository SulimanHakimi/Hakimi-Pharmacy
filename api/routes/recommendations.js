const express = require("express");
const router = express.Router();
const Recommendation = require("../models/Recommendations");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./middleware");

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const recommendation = await Recommendation.find();
    res.status(200).json(recommendation);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving recommendation", error: err });
  }
});
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const recommendations = await Recommendation.find();
    res.status(200).json(recommendations);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving recommendations", error: err });
  }
});

router.get("/:id",verifyTokenAndAuthorization, async (req, res) => {
  try {
    const recommendation = await Recommendation.find({ user: req.params.id });

    if (!recommendation) {
      return res.status(404).json({ message: "recommendation not found" });
    }
    res.status(200).json(recommendation);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving recommendation"});
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const recommendation = await Recommendation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!recommendation) {
      return res.status(404).json({ message: "recommendation not found" });
    }
    res.status(200).json(recommendation);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating recommendation", error: err });
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const recommendation = await Recommendation.findByIdAndDelete(
      req.params.id
    );
    if (!recommendation) {
      return res.status(404).json({ message: "recommendation not found" });
    }
    res.status(200).json({ message: "recommendation deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting recommendation", error: err });
  }
});

module.exports = router;
