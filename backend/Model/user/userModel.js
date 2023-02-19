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
    type:mongoose.Schema.Types.ObjectId,  
    ref: "School",  
    required:true 
},
  acessPermissions: {
    type: String,
    default: "member",
  },
  authorizationToken: String,
});
const user = new mongoose.model("User", userSchema);
module.exports = user;
