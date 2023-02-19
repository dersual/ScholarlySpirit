const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lowestGrade: {
    type: Number,
    required: true,
  },
  highestGrade: {
    type: Number,
    required: true,
  },
  schoolCode: this.ObjectId,
  staff: {
    type: Array,
    required: true,
  },
  students: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  events: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
});
const school = mongoose.model("School", schoolSchema);
module.exports = school;
