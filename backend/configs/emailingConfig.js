const nodemailer = require('nodemailer');
const auth = require('./jwtConfigs');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendVerificationEmail = async (email, id) => {
  try {
    const token = auth.generateEmailVertificationToken({ id });
    const verificationLink = `http://localhost:3000/verifyEmail/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email address',
      html: `Click <a href="${verificationLink}">here</a> to verify your email address.  
      <br/> <br/> From: Scholarly Spirit`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw new Error('Could not send vertification email');
  }
};
exports.sendSchoolCode = async (email, schoolCode) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'School Code',
      html: `Hi, this is your school code: ${schoolCode}  
      <br/> <br/> 
      Please share it wisely. 
      <br/> <br/> From: Scholarly Spirit`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Could not send School Code Email');
  }
};
exports.sendGuideEmail = async (email, id) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Short Guide On How To Use Scholarly Spirit',
      html: `Hello`,
    };
  } catch (error) {}
};
exports.notifyAdminOnJoinedMember = async (email, name, schoolName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Notification On New User Joining',
      html: `Hi! <br/> <br/> Just wanted to notify you that a new user named ${name} just joined your school, ${schoolName}.  
      <br/> <br/> From: Scholarly Spirit`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Error in notifying admin on new member joining');
  }
};
exports.notifyMembersOnJoinedStudents = async (email, registeredStudents, unRegisteredStudents) => {
  try { 
    const allRegisteredStudents = () => {
      if (registeredStudents.length === 0) return 'None';
      for (student of registeredStudents) { 
        return student.name
      }
    }; 
    const allUnRegisteredStudents = () => {
      if (unRegisteredStudents.length === 0) return 'None';
      for (student of unRegisteredStudents) {
        return student.name;
      }
    }; 
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Notification Regarding The New Students',
      html: `Hi! <br/><br/> 
    Here are the students who just got registered ${allRegisteredStudents()},   
    <br/> <br/> 
    Here are the students who weren't able to be registered ${allUnRegisteredStudents()} 
    <br/> <br/> From: Scholarly Spirit`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Error in notifying faculty on new students joining');
  }
};
exports.notifyMembersOnJoinedStudent = async (email,student) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Notification Regarding The New Students',
      html: `Hi! <br/><br/> 
  This is the student who just got registered ${student.name},   
  <br/> <br/> From: Scholarly Spirit`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Error in notifying faculty on new students joining');
  }
};
exports.notifyStudentOnRegistration = async (student) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: 'Notification on Student Registration in Scholarly Spirit',
      html: `Hi ${student.name}! <br/> <br/> 
          A faculty member in your school just successfully registered you in Scholarly Spirit.Scholarly Spirit is computer 
          application designed to help teachers track student participation in school events   
          and reward them in a simple, secure way. So stay tune for rewards you might get and keep that school spirit burning 
          <br/> <br/> From: Scholarly Spirit`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Error in notifying students on registration');
  }
}; 
exports.notifyMembersOnEventCreation = async (email, event) => { 
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Notification on Student Registration in Scholarly Spirit',
      html: `Hi! <br/> <br/> 
          A new event called ${event.name} just got created. 
          <br/> <br/> From: Scholarly Spirit`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Error in notifying members on new event');
  }
}
exports.notifyStudentOfNewPoints = async (studentEmail, pointsRewarded, event) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: studentEmail,
      subject: 'Notification on points rewarded from an event',
      html: `Hi! <br> <br> Notifying you that for going to ${event}, 
      you just have received ${pointsRewarded}`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Error in sending student email');
  }
};
