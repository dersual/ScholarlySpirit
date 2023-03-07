const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, 
  type: { 
    type:String, 
    required: true, 
    enum:["Sporting", "Non-Sporting"]
  },
  dateEnding: {
    type: Date,
    required: true, 
  },
  schoolCode: {
    type: mongoose.Schema.ObjectId, 
    ref:"School",
    required: true,
  },
  pointsRewarded: {
    type: Number,
    required: true,  
  },
  studentParticipating: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});
const event = mongoose.model("Events", eventSchema); 
module.exports = event;
