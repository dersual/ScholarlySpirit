const express = require('express');  
const user = require("./Controls/user.js") 
const router = express.Router();  
const path = require("path");  
const bcrypt = require("bcrypt")    
router.post('/register', (req, res) => {
  user.createUser(req,res) 

  }) 
router.post("/login", (req,res) => {     
  try {   
     //check if user exists  
     if(await user.findOne({ email: req.body.email }) && bcrypt.compare(req.body.password, user.password)) {  
      //do stuff 
    }  
    else {  
      res.status(400).json({error: "Username or Password is wrong"}) 
    } 
} catch (error) { 
  res.status(400).json({ error });
}
}) 
router.post("/addSchoolCode/:id", (req, res) => { 
 
}) 
router.post("/changeAccessPermissions/:id", (req,res) => { 
  
})
module.exports = router; 