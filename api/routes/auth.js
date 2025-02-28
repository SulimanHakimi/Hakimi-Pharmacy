const express = require("express");
const router = express.Router();
const passport = require("passport");
router.get("/user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Unauthorized access" });
  }
});
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
    res.redirect(`${process.env.CLIENT_URL}/login/success`);
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.send(err);
    res.redirect("/");
  });
});

module.exports = router;
