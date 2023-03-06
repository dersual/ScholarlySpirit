const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const bcrypt = require("bcryptjs");
const Student = require("../Model/studentModel.js");
const mongoose = require("mongoose"); 
exports.createAStudent = async (req, res) => { 
  try { 
    const studentAttributes = { 
      name:req.body.name,  
      email: req.body.email, 
      grade: req.body.grade,  
      studentCode: req.user.userSchoolCode 
    }
    const student = new Student(studentAttributes) 
    await student.save(); 
    return;
  } catch (error) { 
    throw new Error("Failed to create Student")
  }
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
  exports.deleteStudent = async (req, res) => { 

  } 
  exports.deleteStudents = async (req, res) => { 

  }