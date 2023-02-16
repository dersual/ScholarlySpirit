var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  
const bcrypt = require('bcryptjs');
const School = require('../models/schoolModel.js'); 
const User = require('..models/userModel.js')
const mongoose = require("mongoose");  

exports.newSchool = (req, res) => { 
    const school = new School(req.body)     
    school.save((err, user) => {
        if (err) {
          return res.status(400).json({
            error: 'Failed to save user in DB'
          });
        }
        res.json({ school });
      });
}  