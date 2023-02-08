const mongoose = require("mongoose"); 
const Schema = mongoose.schema; 
const schoolSchema = new Schema ({ 
    name:{ 
        type: this.ObjectId, 
        required: true
    }, 
   schoolCode: { 
    type: ObjectId, 
    required: true, 
    unique: true
   },
    staff: {  
        type:Array,
        required: true
    }
 }) 
 