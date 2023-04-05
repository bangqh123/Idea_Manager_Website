const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name_department: String,
  description: String,
  owner: String,
  email: String,
  categorys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

const Department = mongoose.model("Department", schema);
module.exports = Department;
