const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  points: 0,
  grade: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  schoolCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  rewards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentRewards",
    },
  ],
});
const student = mongoose.model("Student", studentSchema);
module.exports = student;
