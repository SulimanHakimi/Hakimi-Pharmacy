const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const getEmailTemplate = async (name) => {
  const templatePath = path.join(__dirname, "../emails/account.html");
  let html = fs.readFileSync(templatePath, "utf8");

  html = html.replace(/{{name}}/g, name || "عزیز");
  return html;
};
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.API_URL + "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0]?.value || "",
            givenName: profile.name?.givenName || "",
            familyName: profile.name?.familyName || "",
            locale: profile._json?.locale || "en",
            gender: profile.gender || "unknown",
            birthday: profile.birthday || "",
            profileUrl: profile.profileUrl || "",
          });
          await user.save();
          const userEmail = profile.emails[0].value;

          const emailHtml = await getEmailTemplate(profile.displayName);

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "🥳 به خانواده ما خوش آمدید",
            html: emailHtml,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
