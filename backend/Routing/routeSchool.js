const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); 
const mail = require("../configs/emailingConfig");
const SchoolModel = require("../Model/schoolModel.js"); 
const School = require("../Controls/school.js"); 
const auth = require("../configs/jwtConfigs");
router.post("/createSchool", async (req, res) => {
  try {
    if (await SchoolModel.findOne({ name: req.body.name })) {
     res.status(409).json({ error: "School Seems To Have Already Been Made" });
    } else {
      await School.newSchool(req, res); 
    }
  } catch (error) {  
    res.status(400).json({error: error.message})
  }
}); 
router.post("/handleFacultyRoleInSchool/:id/:schoolCode", async (req, res) => {
 await School.handleRolesOnJoin(req, res);
}); 
router.get("/getFaculty", auth.authenticateToken, async (req, res) => {
  try {    
   await School.getAllFaculty(req, res); 
  } catch (error) {  
    res.status(400).json({error: error.message})
  }
});
module.exports = router;
