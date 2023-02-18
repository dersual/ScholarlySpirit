const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken")
const User = require("../Controls/user.js"); 
const UserModel = require("../Model/user/userModel")
router.post("/register", async (req, res) => {
  try {    
   if(await UserModel.findOne({email: req.body.email}))  {    
    res.status(409).send("Account Seems To Have Already Been Made")
   } 
   else {
    User.createUser(req, res); 
   }
  } catch (error) {
    res.status(400).json({ error });
  }
 
});
router.post("/login", async (req, res) => {
  try {
    //check if User exists
    if (
      (await UserModel.findOne({ email: req.body.email })) &&
      bcrypt.compare(req.body.password, User.password)
    ) {
      //do stuff
    } else {
      res.status(400).json({ error: "Username or Password is wrong" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
router.post("/addSchoolCode/:id", (req, res) => {});
router.post("/changeAccessPermissions/:id", (req, res) => {});
module.exports = router;
