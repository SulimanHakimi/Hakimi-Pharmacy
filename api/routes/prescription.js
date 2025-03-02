const express = require("express");
const Prescription = require("../models/Prescription");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./middleware");
const router = express.Router();

router.post("/upload", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const { file, userId } = req.body;

    const newPrescription = new Prescription({
      user: userId,
      file: file,
    });
    await newPrescription.save();
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ createdAt: -1 });
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const prescription = await Prescription.find({ user: req.params.id });

    if (!prescription) {
      return res.status(404).json({ message: "prescription not found" });
    }
    res.status(200).json(prescription);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving prescription", error: err });
  }
});
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({ message: "Prescription deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting prescription", error: err });
  }
});
router.put("/:id/status", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const { status } = req.body;
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.status(200).json(prescription);
  } catch (err) {
    res.status(500).json({ message: "Error updating status", error: err });
  }
});
module.exports = router;
