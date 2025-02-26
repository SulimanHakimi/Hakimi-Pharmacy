const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  comments: { type: Array, default: [], required: false },
  profile: {
    type: String,
    required: false,
    default: "https://cdn-icons-png.flaticon.com/128/64/64572.png",
  },
});
module.exports = mongoose.model("Post", PostSchema);
