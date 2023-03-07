//Routes for admin to use
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../configs/jwtConfigs");
const mail = require("../configs/emailingConfig");
const User = require("../Controls/user.js");
const UserModel = require("../Model/userModel");
const SchoolModel = require("../Model/schoolModel.js");
const School = require("../Controls/school.js");
const Student = require("../Controls/student");
const studentModel = require("../Model/studentModel");
const EventModel = require("../Model/eventModel.js");
const Event = require("../Controls/event.js");
const { authenticateToken } = require("../configs/jwtConfigs"); 
async function  changeTheSchoolCode () { 
  try {
    await School.changeSchoolCode(req, res);
    const admin = UserModel.findById({ _id: req.user.userID });
    const payload = {
      userID: admin._id,
      userSchoolCode: admin.schoolCode,
      userPermissions: admin.accessPermissions,
    };
    admin.refreshTokens = [];
    await admin.save();
    const accessToken = await auth.generateAccessToken(payload);
    const refreshToken = await auth.generateRefreshToken(payload);
    return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
 
router.delete("/kickUser/:email", auth.authenticateToken, async (req, res) => {
  if (req.user.userPermissions === "admin") { 
  await User.deleteUser(req, res);   
  await changeTheSchoolCode();
  } else {
    res.status(401).json({ error: "Not Permited", alertUser: true });
  }
}); 
router.delete("/kickStudent/:email", auth.authenticateToken, async (req, res) => {
  if (req.user.userPermissions === "admin") { 
    try { 
      const student = await studentModel.find({email:req.params.email})
      req.params.id  = student.id; 
      await Student.deleteStudent(req, res)
    } catch (error) { 
      res.status(401).json({error:error.message})
    }
  } else {
    res.status(401).json({ error: "Not Permited", alertUser: true });
  }
}); 
//delete all students and events etc.
router.delete("/endOfSchoolYear", auth.authenticateToken, async (req, res) => {
  if (req.user.userPermissions === "admin") { 
    const admin = UserModel.findById({ _id: req.user.userID }); 

  } else {
    res.status(401).json({ error: "Not Permited", alertUser:true });
  }
});

module.exports = router;
