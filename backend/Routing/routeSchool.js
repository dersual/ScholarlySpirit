const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../Controls/user.js");
const studentModel = require("../Model/school/schoolModel");
const eventModel = require("../Model/event/eventModel");
const UserModel = require("../Model/user/userModel");
const SchoolModel = require("../Model/school/schoolModel");
const School = require("../Controls/school");
router.post("/createSchool", async (req, res) => {
  if (await SchoolModel.findOne({ name: req.body.name })) {
    res.status(409).json({ error: "School Seems To Have Already Been Made" });
  } else {
    School.newSchool(req, res);
  }
});
router.post("/addStaff/:id/:schoolCode", async (req, res) => {
  School.addNewFaculty(req, res);
});
module.exports = router;
