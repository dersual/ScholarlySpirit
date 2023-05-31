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
  rewardConfigurations: {  
    type: mongoose.Schema.Types.ObjectId,  
    ref: "schoolSettings"
  },
}); 
const school = mongoose.model("School", schoolSchema);
module.exports = school;
