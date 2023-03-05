const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  schoolCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
    required: true,
  },
  accessPermissions: {
    type: String,
    default: "member",
  },
  emailVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }, 
  refreshTokens:  {
    type: [String],
    default: []
  }
});
const user = new mongoose.model("User", userSchema); 

module.exports = user;
