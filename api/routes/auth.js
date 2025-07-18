const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyTokenAndAuthorization } = require("./middleware");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
};

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(
      `${
        process.env.CLIENT_URL
      }/login/success?token=${token}&user=${JSON.stringify(req.user)}`
    );
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body.emailPass;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = generateToken(user);

    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    const userObj = newUser.toObject();
    delete userObj.password;
    res.status(201).json(userObj);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.send(err);
    res.redirect("/");
  });
});

module.exports = router;
