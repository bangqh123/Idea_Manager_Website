const { Validator } = require("node-input-validator");
const Department = require("../models/department.model");
const Category = require("../models/category.model");
const mongoose = require("mongoose");
const user = require("../models/accounts.model");
const fs = require("fs");
const { TokenExpiredError } = require("jsonwebtoken");

exports.addDepart = async (req, res) => {
  const v = new Validator(req.body, {
    name_department:
      "required|minLength:5|maxLength:100|unique:Department,name_department",
    description: "required",
    email: "required",


  });
  const matched = await v.check();
  if (!matched) {
    return res.status(422).send(v.errors);
  }
  try {
    let checkEmail = await user.findOne({ email: req.body.email });
    if (checkEmail) {
      console.log(checkEmail._id);

      const newDepart = new Department({
        name_department: req.body.name_department,
        description: req.body.description,
        owner: checkEmail._id,
        email: req.body.email
      });

      console.log("newDepart", newDepart);
      let userDepart = await newDepart.save();

      return res.status(200).send({
        message: "Added successfully",
        data: userDepart,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      data: error,
    });
  }
};

exports.departments = async function (req, res) {
  try {

    const allDepartments = await Department.find();
    res.status(200).send({ allDepartments });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      data: error,
    });
  }
};

exports.A_departments = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    res.status(200).send({
      department,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      data: error,
    });
  }
};

//update department

exports.update = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    await department.updateOne({ $set: req.body });
    return res.status(200).json("Update successfully");
  } catch (error) {
    res.status(400).json("Error updating department");
  }
};
// delete

exports.delete = async (req, res) => {
  try {
    await Category.updateMany({ departs: req.params.id }, { departs: null });
    await Department.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
};
