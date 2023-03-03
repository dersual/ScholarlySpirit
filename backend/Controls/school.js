const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
const mail = require("../configs/emailingConfig")
const School = require("../Model/schoolModel.js");
const User = require("../Model/userModel.js");
const Event = require("../Model/eventModel");
const Student = require("../Model/studentModel"); 
const Setting = require("../Model/schoolSettingsModel")
const mongoose = require("mongoose");
exports.newSchool = async (req, res) => {
  try {
    req.body.grades = JSON.parse(req.body.grades);
    const school = new School(req.body); 
    const setting = new Setting(); 
    await setting.save(); 
    school.setting = setting._id; 
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
exports.handleRolesOnJoin = async (req, res) => {
  try {
    const school = await School.findById(req.params.schoolCode);
    const user = await User.findById(req.params.id); 
    if (!school || !user) {
      return res.status(404).json({error: "Matching document not found"});
    } else {    
      const staff = await User.find({schoolCode: req.params.schoolCode}) 
      if(staff.length === 1) { 
        user.accessPermissions = "admin" 
        await user.save();
      } 
      else{    
        //get admin in the school.staff 
        const admins = await User.find({schoolCode: req.params.schoolCode, accessPermissions: "admin"})   
        for(i in admins) {   
          console.log(admins[i])
          await mail.notifyAdminOnJoinedMember(admins[i].email, user.name, school.name)
        }
      }
      return res.status(200).json(school);
    }
  } catch (error) { 
    console.error(error)
    return res.status(500).json({ error });
  }
};
exports.addNewStudents = (req, res) => {};
exports.addNewEvent = (req, res) => {};
