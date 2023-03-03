const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const settingsSchema = new Schema({
  rewardPeriod: {
    type: Number,
    required: true,
    default: 4,
  },
  rewardPeriodName: {
    type: String,
    required: true,
    default: "Semester",
  },
  topTen: {
    type: String,
    required: true,
    enum: ["In Each Grade", "In All Of School"], 
    default: "In Each Grade"
  },
  prizeList: {
    type: Array,
    default: [
      { place: 1, reward: "Free Parking for a Month" },
      { place: 2, reward: "Free Access To Events For Two Weeks" },
      { place: 3, reward: "Free Food For A Week" },
      { place: 4, reward: "Free School Spirit Ware of Any Your Choosing" },
      { place: 5, reward: "Free Homework Pass For Any Assignment of Your Choosing" },
      { place: 6, reward: "Free Homework Pass For Any Assignment of Your Choosing" },
      { place: 7, reward: "Free Homework Pass For Any Assignment of Your Choosing" },
      { place: 8, reward: "Free Homework Pass For Any Assignment of Your Choosing" },
      { place: 9, reward: "Free Homework Pass For Any Assignment of Your Choosing" },
      { place: 10, reward: "Free Homework Pass For Any Assignment of Your Choosing" },
    ],
  } /*
  validate: {
    validator: function (value) {
      return value.topTen === "In Each Grade" || value.topTen === "For Entire School";
    },
    message: "topTen must be 'In Each Grade' or 'For Entire School'",
  },*/,
});
const setting = mongoose.model("schoolSetting", settingsSchema);
module.exports = setting;
