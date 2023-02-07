const mongoose = require("mongoose"); 
const Schema = mongoose.schema; 
const userSchema = new Schema({ 
email: { 
    type:String, 
    required:true 
}, 
password: { 
    type:String, 
    required:true 
},  
firstname: {
    type:String, 
    required:true 
},  
lastname: { 
    type:String, 
    required:true
},
school: {
    type:String, 
    required:true 
}
}); 
