const express = require('express');  
const user = require("./Controls/user.js")
const router = express.Router();  
const path = require("path");    
router.post('/register', (req, res) => {
  user.createUser()
  }) 
router.post("/login", (req,res) => { 

}) 
router.post("/addSchoolCode", (res, req) => { 
 
})
module.exports = router; 