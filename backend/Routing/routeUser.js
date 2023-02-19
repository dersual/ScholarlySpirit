const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Controls/user.js");
const UserModel = require("../Model/user/userModel");
router.post("/setup-user", async (req, res) => {
  try {
    if (await UserModel.findOne({ email: req.body.email })) {
      res.status(409).header({ error: "Account Seems To Have Already Been Made" });
    } else {
      const password = await bcrypt.hash(req.body.password, 10);
      res.json({ email: req.body.email, name: req.body.name, password: password });
    }
  } catch (error) {
    res.status(400).header({ error });
  }
});
router.post("/register", async (req, res) => {
  try { 
    User.createUser(req, res); 
    res.status(200).json(User)
  } catch (error) { 
    res.json({error})
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
