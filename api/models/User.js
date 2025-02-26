const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  picture: { type: String, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String, required: true },
  locale: { type: String, required: true },
  gender: { type: String, required: true },
  birthday: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
