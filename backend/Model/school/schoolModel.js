const mongoose = require("mongoose"); 
const Schema = mongoose.schema; 
const schoolSchema = new Schema ({ 
    name:{ 
        type: this.ObjectId, 
        required: true
    }, 
   schoolCode: this.ObjectId,
    staff: {  
        type:Array,
        required: true
    },
    students: Array, 
    events: { 
       type: Array 
    }
 }); 
 const school = mongoose.model("School", schoolSchema) 
 module.exports = school; 
 