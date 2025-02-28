const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String, required: true },
  locale: { type: String },
  gender: { type: String },
  birthday: { type: String },
  profileUrl: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
