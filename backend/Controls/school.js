const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const School = require("../Model/schoolModel.js");
const User = require("../Model/userModel.js");
const eventModel = require("../Model/eventModel");
const Student = require("../Model/studentModel");
const mongoose = require("mongoose");

exports.newSchool = async (req, res) => {
  try {
    req.body.grades = JSON.parse(req.body.grades);
    const school = new School(req.body);
    await school.save();
    return res.status(200).json(school);
  } catch (error) {
    console.error(error);
    // return res.status(400).json({error: "Failed to save school in DB"});
    throw new Error("Failed to save school in DB");
  }
};
exports.getSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    return res.status(200).json(school);
  } catch (error) {
    return res.status(400).json({
      error: "School not found",
    });
  }
};
exports.addNewFaculty = async (req, res) => {
  try {
    const school = await School.findById(req.params.schoolCode);
    const user = await User.findById(req.params.id); 
    if (!school || !user) {
      return res.status(404).json({error: "Matching document not found"});
    } else { 
      if(school.staff.length == 0) { 
        user.accessPermissions = "admin" 
        await user.save();
      }
      school.staff.push(user._id);
      await school.save();
      return res.status(200).json(school);
    }
  } catch (error) { 
    console.error(error)
    return res.status(500).json({ error });
  }
};
exports.addNewStudents = (req, res) => {};
exports.addNewEvent = (req, res) => {};
