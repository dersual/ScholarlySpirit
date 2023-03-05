const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const bcrypt = require("bcryptjs");
const Student = require("../Model/studentModel.js");
const mongoose = require("mongoose");
exports.createAStudent = async (req, res) => {};
exports.createStudents = async (req, res) => { 
  
};
exports.getAStudent = async (req, res) => { 
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
          return res.status(404).json({
            error: "Student not found",
          });
        }
        res.json(student);
      } catch (err) {
        return res.status(500).json({
          error: "Internal server error",
        });
      }
}; 
exports.getStudents = async (req, res) => { 
  try {
    const students = await Student.find({schoolCode: req.user.userSchoolCode}, { name: 1, email: 1, points:1 })    
    return res.status(200).json({students}) 
  } catch (error) {
    throw new Error(error)
  }
  }    