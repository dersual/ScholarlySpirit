const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  grades: [
    {
      type: Number,
      required: true,
    },
  ],
  schoolCode: Schema.ObjectId,
  staff: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }],
});
const school = mongoose.model("School", schoolSchema);
module.exports = school;
