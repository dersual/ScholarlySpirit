const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../Controls/user.js");
const studentModel = require("../Model/school/schoolModel");
const eventModel = require("../Model/event/eventModel");
const UserModel = require("../Model/user/userModel");
router.post("/createSchool", async(req, res) => { 
    
});
module.exports = router;
