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
name: {
    type:String, 
    required:true 
},  

schoolCode: {
    type:String,
}, 
acessPermissions: { 
type:String
}

});  
const user = new mongoose.model("User", userSchema); 
module.exports = user; 