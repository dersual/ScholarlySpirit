const mongoose = require("mongoose");
const Schema = mongoose.schema;
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
  students: Array,
  events: {
    type: Array,
  },
});
const school = mongoose.model("School", schoolSchema);
module.exports = school;
