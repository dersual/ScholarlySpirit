const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 
const studentSchema = new Schema ({ 
    name: { 
        type: String, 
        required:true
    }, 
    points:Number, 
    grade: { 
        type:Number,  
        required:true
    }, 
    email: { 
        type:String, 
        required:true
    }
}) 
const student = mongoose.model("Student", studentSchema) 
module.exports = student; 