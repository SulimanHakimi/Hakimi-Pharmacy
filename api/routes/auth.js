const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/account");
  }
);
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.send(err);
    res.redirect("/");
  });
});

module.exports = router;
