const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const bcrypt = require("bcryptjs");
const Student = require("../Model/studentModel.js");
const mongoose = require("mongoose");
exports.createAStudent = async (req, request) => {};
exports.createStudents = async (req, request) => {};
exports.getStudent = async (req, request) => { 
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
