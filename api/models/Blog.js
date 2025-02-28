const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  comments: { type: Array, default: [], required: false },
  profile: {
    type: String,
    required: false,
    default: "",
  },
});
module.exports = mongoose.model("Post", PostSchema);
