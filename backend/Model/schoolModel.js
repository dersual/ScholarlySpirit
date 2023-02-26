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
      ref: "users",
    },
  ],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "students" }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
});
const school = mongoose.model("School", schoolSchema);
module.exports = school;
