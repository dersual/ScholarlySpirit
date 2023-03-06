const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const rewardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["duration-based", "instant-based"],
    default: "instant-based",
  },
  active: {
    type: Boolean,
    default: false,
  },
});
const reward = mongoose.model("reward", rewardSchema);
module.exports = reward;
