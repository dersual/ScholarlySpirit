const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const bcrypt = require('bcryptjs');
const Student = require('../Model/studentModel.js');
const mongoose = require('mongoose');
const user = require('../Model/userModel.js');
const student = require('../Model/studentModel.js');
exports.createAStudent = async (req, res) => {
  try {
    console.log(req.body, req.user.userSchoolCode);
    if (Student.find({ email: req.body.email, schoolCode: req.user.userSchoolCode })) {
      res.status(202).json({ alertUser: true, message: 'You already have a student with this email' });
    }
    const studentAttributes = {
      name: req.body.name,
      email: req.body.email,
      grade: req.body.grade,
      schoolCode: req.user.userSchoolCode,
    };
    const student = new Student(studentAttributes);
    await student.save();
    return student;
  } catch (error) {
    console.error(error.message);
    throw new Error('Failed to create Student');
  }
};

exports.getAStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        error: 'Student not found',
      });
    }
    res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};
exports.getStudents = async (req, res) => {
  try {
    const User = await user.findById({ _id: req.user.userID });
    const val = req.body;
    const sortType = val.sortType === 'Points' ? '-points' : '-grade';
    const students = await Student.find(
      { schoolCode: req.user.userSchoolCode },
      { name: 1, email: 1, grade: 1, points: 1 }
    ).sort(sortType);
    if (students.length === 0)
      return res
        .status(202)
        .json({ students: students, alertUser: true, message: 'You have no students uploaded in this School.' });
    const studentFiltered = students.filter(
      (student) => student.name.includes(val.name) || student.email.includes(val.email)
    );    
    studentFiltered.forEach(student => { 
      student.grade = JSON.stringify(student.grade) 
      student.points = JSON.stringify(student.points)
    })
    return res.status(200).json({ student: studentFiltered, user: User });
  } catch (error) {
    throw new Error(error);
  }
};
exports.deleteStudent = async (req, res) => {};
exports.deleteStudents = async (req, res) => {};
