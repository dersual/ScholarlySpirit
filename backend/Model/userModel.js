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
  verificationToken: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }, 
  //authorizationToken: String,
});
const user = new mongoose.model("User", userSchema);
module.exports = user;
