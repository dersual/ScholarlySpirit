const express = require("express");
const router = express.Router();
const Student = require("../Controls/student");
const StudentModel = require("../Model/studentModel");
const auth = require("../configs/jwtConfigs"); 
const mail = require("../configs/emailingConfig")
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "backend/uploads/" });
router.post("/uploadStudents", auth.authenticateToken, upload.single("file"), async (req, res) => {
  try {
    // Read the contents of the file
    const fileContents = fs.readFileSync(req.file.path, "utf8");

    // Split the contents of the file by line
    const lines = fileContents.trim().split("\n");

    // Parse the lines and create student documents
    const students = lines.map((line) => {
      const [name, email, grade] = line.split(","); 
      if(StudentModel.find({email:email})) {  
        return "duplicate"
      }
      return new StudentModel({
        name,
        email,
        grade: parseInt(grade),
      });
    }); 
    
    const newStudents = students.filter(student => student === "duplicate")
    // Insert the student documents into the database
    await StudentModel.insertMany(newStudents)  

    res.status(200);
  
  } catch (error)  {
  console.error(error)   
  throw new Error(error)
  }
});
router.post("/getStudents", auth.authenticateToken, async (req, res) => {
  try {
  } catch (error) {}
});
router.get("/getStudent", auth.authenticateToken, async (req, res) => {
  try {
  } catch (error) {}
});
module.exports = router;
