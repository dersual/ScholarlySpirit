const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const eventModel = require('../Model/eventModel');
const mail = require('../configs/emailingConfig');
const schoolModel = require('../Model/schoolModel');
const userModel = require('../Model/userModel');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.createEvent = async (req, res) => {
  try {
    const event = new eventModel({
      type: req.body.type,
      name: req.body.name,
      pointsRewarded: req.body.pointsRewarded,
      schoolCode: req.user.userSchoolCode,
      dateEnding: req.body.dateEnding,
    });
    await event.save();
    const user = await userModel.findById({ _id: req.user.userID });
    const admin = await userModel.find({ accessPermissions: 'admin', schoolCode: req.user.userSchoolCode });
    await mail.notifyMembersOnEventCreation(admin[0].email, event);
    await mail.notifyMembersOnEventCreation(user.email, event);
    res.status(200).json({ event });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};
exports.getEvents = async (req, res) => {
  try {
    const User = await userModel.findById({ _id: req.user.userID });
    const val = req.body;
    console.log(val);
    const sortType = val.sortType === 'Sporting' ? '-sporting' : val.sorType === 'Non-sporting' ? 'non-sporting' : 'points';
    const events = await eventModel
      .find({ schoolCode: req.user.userSchoolCode }, { name: 1, type: 1, dateEnding: 1, points: 1 })
      .sort(sortType);
    if (events.length === 0) {
      return res.status(202).json({
        events: events, 
        user:User,
        alertUser: true,
        message: 'You have no events uploaded in this School.',
      });
    }
    const eventsFiltered = events.filter((event) => event.name.toLowerCase().includes(val.name.toLowerCase().trim()));
    const modifiedEvents = eventsFiltered.map((event) => ({
      name: event.name,
      type: event.type,
      dateEnding: 'Date Ending :' + event.dateEnding.toString('en-US'),
      points: JSON.stringify(event.points) + ' Points',
    })); 
    console.log(User)
    return res.status(200).json({ event: modifiedEvents, user: User });
  } catch (error) {
    throw new Error(error);
  }
};
exports.addStudent = async (req, res) => {};
