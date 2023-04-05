const Category = require("../models/category.model");
const department = require("../models/department.model");
const mongoose = require("mongoose");
const depart = require("../models/department.model");
const { Validator } = require("node-input-validator");

exports.addCate = async (req, res) => {
  const v = new Validator(req.body, {
    name_category:
      "required|minLength:5|maxLength:100|unique:Department,name_department",
    name_depart: "required",
  });
  const matched = await v.check();
  if (!matched) {
    return res.status(422).send(v.errors);
  }
  try {
    const checkDepart = await department.findOne({
      name_department: req.body.name_depart,
    });
    console.log(checkDepart._id);

    if (checkDepart) {
      const newCate = new Category({
        name_category: req.body.name_category,
        name_depart: req.body.name_depart,
        departs: checkDepart._id,
      });
      const saveCate = await newCate.save();
      if (checkDepart._id) {
        const cate = department.findById(checkDepart._id);
        await cate.updateOne({ $push: { categorys: saveCate._id } });
      }
      res.status(200).json(saveCate);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL CATEGORY
exports.getAllCategory = async (req, res) => {
  const categories = await Category.find();
  const categoriesCount = await Category.countDocuments();

  res.status(200).json({
    success: true,
    categoriesCount,
    categories,
  });
};
exports.deleteCategory = async (req, res) => {
  try {
    await department.updateMany(
      { categorys: req.params.id },
      { $pull: { categorys: req.params.id } }
    );
    await Category.findByIdAndDelete(req.params.id);
    return res.status(201).send({
      message: "Delete successfully",
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await department.updateMany(
      { categorys: req.params.id },
      { $pull: { categorys: req.params.id } }
    );
    await Category.findByIdAndDelete(req.params.id);
    return res.status(201).send({
      message: "Delete successfully",
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
};
exports.updateCategory = async (req, res) => {
  const v = new Validator(req.body, {
    name_category: "required",
    name_depart: "required",
  });
  const matched = await v.check();
  if (!matched) {
    return res.status(422).send(v.errors);
  }
  try {
    const updateCate = await Category.findById(req.params.id);
    await updateCate.updateOne({ $set: req.body });
    return res.status(201).send({
      message: "Update successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
