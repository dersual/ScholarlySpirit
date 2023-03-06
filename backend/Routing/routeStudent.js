const express = require('express');
const router = express.Router();
const Student = require('../Controls/student');
const StudentModel = require('../Model/studentModel');
const School = require('../Model/schoolModel.js');
const auth = require('../configs/jwtConfigs');
const mail = require('../configs/emailingConfig');
const fs = require('fs');
const multer = require('multer');
const user = require('../Model/userModel');
const upload = multer({ dest: 'backend/uploads/' });
router.post('/uploadStudents', auth.authenticateToken, upload.single('file'), async (req, res) => {
  try {
    //get School max and min grades
    const school = await School.findById({ _id: req.user.userSchoolCode });
    const minGrade = Math.min(...school.grades);
    const maxGrade = Math.max(...school.grades);
    // Read the contents of the file
    const fileContents = fs.readFileSync(req.file.path, 'utf8');

    // Split the contents of the file by line
    const lines = fileContents.trim().split('\n');

    // Parse the lines and create student documents
    const students = lines.map((line) => {
      const [name, email, grade] = line.split(',');
      if (StudentModel.find({ email: email }) || grade < minGrade || grade > maxGrade) {
        return { name: name, failed: 'Not Registerable' };
      }
      return new StudentModel({
        name,
        email,
        grade: parseInt(grade),
      });
    });

    const newStudents = students.filter((student) => student.failed === 'Not Registerable');
    const studentsNotRegistered = students.filter((student) => student.failed !== 'Not Registerable');
    const User = await user.findById({ _id: req.user.userID });
    const admin = await user.find({
      schoolCode: req.user.userSchoolCode,
      accessPermissions: req.user.userPermissions,
    });

    const notifyStudents = async () => {
      const notifications = newStudents.map((student) => mail.notifyStudentOnRegistration(student));
      await Promise.all(notifications);
    };

    const notifyMembers = await mail.notifyMembersOnJoinedStudents(User, newStudents, studentsNotRegistered);
    const notifyAdmin = mail.notifyAdminOnNewStudents(admin[0], newStudents, studentsNotRegistered)

    await Promise.all([notifyStudents(), notifyMembers, notifyAdmin]);
    // Insert the student documents into the database
    await StudentModel.insertMany(newStudents);
    fs.unlink(req.file.path, (error) => {
      if (error) {
        console.error(error);
        throw new Error(error);
      }
      res.status(200);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}); 
router.post("/createStudent", auth.authenticateToken, async (req, res) => {   
  try {  
    const student = await Student.createAStudent(req, res)   
     const admins = await user.find({
      schoolCode: req.user.userSchoolCode,
      accessPermissions: req.user.userPermissions,
    }); 
    const User = await user.findById(
      { _id: req.user.userID },
      { name: 1, accessPermissions: 1, email: 1 }
    );
   await mail.notifyStudentOnRegistration(student)
   await mail.notifyMembersOnJoinedStudent(User.email, student, "");
   await mail.notifyMembersOnJoinedStudent(admins[0].email, student, "");
    res.status(200).json(student)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})
router.post('/getStudents', auth.authenticateToken, async (req, res) => {
  try { 
    await Student.getStudents(req, res);
  } catch (error) {  
    console.error(error)
    res.status(401).json({ error:error.message });
  }
});
router.get('/getStudent/:studentID', auth.authenticateToken, async (req, res) => {
  try { 
  } catch (error) {}
});
module.exports = router;
