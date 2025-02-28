const express = require("express");
const Prescription = require("../models/Prescription");
const router = express.Router();

router.post("/upload", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ createdAt: -1 });
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/:id", async (req, res) => {
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
module.exports = router;
