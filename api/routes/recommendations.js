const express = require("express");
const router = express.Router();
const Recommendation = require("../models/Recommendations");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./middleware");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const getEmailTemplate = async (recommendation, user) => {
  const templatePath = path.join(__dirname, "../emails/recomendition.html");

  let html = fs.readFileSync(templatePath, "utf8");
  const date = new Date(Date.now());
  const formattedDate = date.toLocaleDateString("fa-IR");
  html = html
    .replace(/{{name}}/g, user.name || "عزیز")
    .replace(/{{medicine}}/g, recommendation.medicine)
    .replace(/{{dosage}}/g, recommendation.dosage)
    .replace(/{{doctor}}/g, recommendation.doctor)
    .replace(/{{recommendationDate}}/g, formattedDate);

  return html;
};
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { medicine, dosage, doctor, user } = req.body;

    const newRecommendation = new Recommendation({
      medicine,
      dosage,
      doctor,
      user,
    });

    const savedRecommendation = await newRecommendation.save();
    const userDetails = await User.findById(user);
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    const emailHtml = await getEmailTemplate(savedRecommendation, userDetails);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userDetails.email,
      subject: "👨‍⚕️ توصیه داکتر برای نسخه شما",
      html: emailHtml,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json(savedRecommendation);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating recommendation", error: err });
  }
});
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const recommendations = await Recommendation.find().sort({ createdAt: -1 });
    if (!recommendations || recommendations.length === 0) {
      return res.status(404).json({ message: "No recommendations found" });
    }
    res.status(200).json(recommendations);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving recommendations", error: err });
  }
});

router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const recommendation = await Recommendation.find({ user: req.params.id }).sort({ createdAt: -1 });

    if (!recommendation) {
      return res.status(404).json({ message: "recommendation not found" });
    }
    res.status(200).json(recommendation);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving recommendation" });
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
