var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const School = require("../Model/school/schoolModel.js");
const User = require("../Model/user/userModel.js");
const mongoose = require("mongoose");

exports.newSchool = (req, res) => {
  req.body.grades = JSON.parse(req.body.grades);
  const school = new School(req.body);
  school.save((err, school) => {
    if (err) {
      console.error(err);
      return res.status(400).json({
        error: "Failed to save school in DB",
      });
    }

    res.status(200).json(school);
  });
};
exports.getSchool = (req, res) => {
  School.findById(req.params.id, (err, school) => {
    if (err || !school) {
      return res.status(400).json({
        error: "School not found",
      });
    }
    res.json(school);
  });
};
exports.addNewFaculty = (req, res) => {
  School.findById(req.params.schoolCode, (err, school) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (!school) {
      return res.status(404).send("Matching document not found");
    }

    User.findById(req.params.id, (err, user) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!user) {
        return res.status(404).send("Matching document not found");
      }

      // Add the user to the staff array
      school.staff.push(user._id);

      // Save the updated school document
      school.save((err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.json(school);
      });
    });
  });
};
exports.addNewStudents = (req, res) => {};
exports.addNewEvent = (req, res) => {};
