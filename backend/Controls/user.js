var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
const User = require('../models/user');

exports.createUser = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to save user in DB'
      });
    }
    res.json({ user });
  });
};

exports.getUser = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    res.json(user);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'You are not authorized to update this user'
        });
      }
      res.json(user);
    }
  );
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(
    { _id: req.params.id },
    { useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to delete user'
        });
      }
      res.json({
        message: 'Deletion was a success'
      });
    }
  );
};