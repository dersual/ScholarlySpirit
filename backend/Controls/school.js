const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mail = require("../configs/emailingConfig");
const School = require("../Model/schoolModel.js");
const User = require("../Model/userModel.js");
const Event = require("../Model/eventModel");
const Student = require("../Model/studentModel");
const Setting = require("../Model/schoolSettingsModel");
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
    const school = await School.findById(req.user.userSchoolCode);
    return res.status(200).json(school);
  } catch (error) { 
    console.error(error)
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
      return res.status(404).json({ error: "Matching document not found" });
    } else {
      const staff = await User.find({ schoolCode: req.params.schoolCode });
      if (staff.length === 1) {
        user.accessPermissions = "admin";
        await user.save();
        mail.sendSchoolCode(user.email, school._id);
      } else {
        //get admin in the school.staff
        const admins = await User.find({
          schoolCode: req.params.schoolCode,
          accessPermissions: "admin",
        });
        for (i in admins) {
          console.log(admins[i]);
          await mail.notifyAdminOnJoinedMember(admins[i].email, user.name, school.name);
        }
      }
      return res.status(200).json(school);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
exports.getAllFaculty = async (req, res) => {
  const val = req.body;
  try {
    const staff = await User.find({ schoolCode: req.user.userSchoolCode }, { name: 1, email: 1 });
    const user = await User.find(
      { _id: req.user.userID },
      { name: 1, email: 1, accessPermissions: 1 }
    );
    const faculty = staff.filter(
      (individualStaff) =>
        individualStaff.name !== user[0].name &&
        (individualStaff.name.includes(val.name) || individualStaff.email.includes(val.email))
    );
    return res.status(200).json({ faculty, user });
  } catch (error) { 
    console.error(error)
    throw new Error(error);
  }
};

exports.changeSchoolCode = async (req, res) => {
  try {
    const school = await School.findById({ _id: req.user.userSchoolCode });
    const newSchool = await School.create({ ...school.toObject(), _id: mongoose.Types.ObjectId() });
    await newSchool.save();
    await User.updateMany({ schoolCode: req.user.userSchoolCode }, { schoolCode: newSchool._id });
    await Student.updateMany(
      { schoolCode: req.user.userSchoolCode },
      { schoolCode: newSchool._id }
    );
    await Event.updateMany({ schoolCode: req.user.userSchoolCode }, { schoolCode: newSchool._id });
    await school.deleteOne();
    const admin = await User.findById({ _id: req.user.userID });
    await mail.sendSchoolCode(admin.email, newSchool._id);
    return;
  } catch (error) { 
    console.error(error)
    throw new Error("Could not change School Code");
  }
};
