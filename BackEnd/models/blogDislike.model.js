const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = new mongoose.Schema(
  {
    blog_id: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  },
  {
    timestamps: true,
  }
);

const BlogDislike = mongoose.model("BlogDislike", schema);
module.exports = BlogDislike;
