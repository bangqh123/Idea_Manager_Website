const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    content: String,
    image: { type: String, default: null },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    blog_comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "BlogComment" },
    ],
    blog_likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "BlogLike" }],
    blog_dislikes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "BlogDislike" },
    ],
    anonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

schema.virtual("image_url").get(function () {
  var fullUrl = req.protocol + "://" + req.get("host");
  return fullUrl + "/uploads/blog_images/" + this.image;
});

const Blog = mongoose.model("Blog", schema);
module.exports = Blog;
