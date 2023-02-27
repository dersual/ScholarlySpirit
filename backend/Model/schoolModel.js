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
  rewardConfigurations: {
    type: Object,
    default: {
      rewardPeriod: 3,
      rewardPeriodName: "Semester",
      topTen: "In Each Grade",
      prizeList: [
        { place: 1, reward: "Free Parking for a Month" },
        { place: 2, reward: "Free Access To Events For Two Weeks" },
        { place: 3, reward: "Free Food For A Week" }, 
        { place: 4, reward: "Free School Spirit Ware of Any Your Choosing"}, 
        { place: 5, reward: "Free Homework Pass For Any Assignment of Your Choosing"}
      ],
    },
    validate: {
      validator: function (value) {
        return value.topTen === "In Each Grade" || value.topTen === "For Entire School";
      },
      message: "topTen must be 'In Each Grade' or 'For Entire School'",
    },
  },
});
const school = mongoose.model("School", schoolSchema);
module.exports = school;
