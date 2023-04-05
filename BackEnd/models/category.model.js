const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  departs: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  name_category: String,
  // description: String,
  name_depart: String,
});

const Category = mongoose.model("Category", schema);
module.exports = Category;

