var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  
const School = require('../Model/school/schoolModel.js'); 
const User = require('../Model/user/userModel.js')
const mongoose = require("mongoose");  

exports.newSchool = (req, res) => { 
    const school = new School(req.body)     
    school.save((err, school) => {
        if (err) {
          return res.status(400).json({
            error: 'Failed to save user in DB'
          });
        } 
        
        res.json({ school });
      });
}   
exports.getSchool = (req, res) => { 
  School.findById(req.params.id, (err, school) => {
    if (err || !school) {
      return res.status(400).json({
        error: "School not found",
      });
    }
    res.json(school);
  });
} 
exports.addNewFaculty = (req, res) => { 

} 
exports.addNewStudents = (req,res) => { 

} 
exports.addNewEvent = (req, res) => { 

}