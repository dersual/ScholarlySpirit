const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dateEnding: {
    type: Date,
    required: true,
  },
  isActive: boolean,
  schoolCode: {
    type: String,
    required: true,
  },
  pointsRewarded: {
    type: Number,
    required: true,
  },
  studentParticipating: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
});
const event = mongoose.model("Events", eventSchema); 
module.exports = event;
