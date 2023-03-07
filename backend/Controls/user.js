const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const bcrypt = require("bcryptjs");
const User = require("../Model/userModel.js");
const mongoose = require("mongoose"); 
const mail = require("../configs/emailingConfig.js")
exports.createUser = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.body.schoolCode)) {
      if (String(new mongoose.Types.ObjectId(req.body.schoolCode)) != req.body.schoolCode) {
        return res.status(404).json({
          error: "School does not Exist",
        });
      } else {
        console.log("id works");
        const user = new User(req.body);
        const savedUser = await user.save();   
        return res.status(200).json(savedUser);
      }
    } else {
      return res.status(404).json({
        error: "School does not Exist",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: "Failed to save user in DB",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userID);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.user.userID },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    if (!user) {
      throw new Error("User not found");
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({
      error: err.message || "You are not authorized to update this user",
    });
  }
};

exports.deleteUser = async (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }, { useFindAndModify: false }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete user",
      });
    } 
    return;
  });
};
