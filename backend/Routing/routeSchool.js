const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); 
const mail = require("../configs/emailingConfig");
const SchoolModel = require("../Model/schoolModel.js"); 
const School = require("../Controls/school.js");
router.post("/createSchool", async (req, res) => {
  try {
    if (await SchoolModel.findOne({ name: req.body.name })) {
     res.status(409).json({ error: "School Seems To Have Already Been Made" });
    } else {
      await School.newSchool(req, res); 
    }
  } catch (err) {  
    console.error(err)
    res.status(400).json({error: err.message})
  }
}); 
router.post("/handleFacultyRoleInSchool/:id/:schoolCode", async (req, res) => {
 await School.handleRolesOnJoin(req, res);
});
module.exports = router;
