const nodemailer = require("nodemailer");
const auth = require("./jwtConfigs");
const transporter = nodemailer.createTransport({
  service: "gmail",
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
      subject: "Verify your email address",
      html: `Click <a href="${verificationLink}">here</a> to verify your email address.  
      <br/> <br/> From: Scholarly Spirit`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw new Error("Could not send vertification email");
  }
};
exports.sendSchoolCode = async (email, schoolCode) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "School Code",
      html: `Hi, this is your school code: ${schoolCode}  
      <br/> <br/> 
      Please share it wisely. 
      <br/> <br/> From: Scholarly Spirit`,
    }; 
    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw new Error("Could not send School Code Email");
  }
};
exports.sendGuideEmail = async (email, id) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Short Guide On How To Use Scholarly Spirit",
      html: `Hello`,
    };
  } catch (error) {}
};
exports.notifyAdminOnJoinedMember = async (email, name, schoolName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Notification On New User Joining",
      html: `Hi! <br/> <br/> Just wanted to notify you that a new user named ${name} just joined your school, ${schoolName}.  
      <br/> <br/> From: Scholarly Spirit`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error in notifying admin on new member joining");
  }
};
exports.notifyStudentOfNewPoints = async (studentEmail, pointsRewarded, event) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: studentEmail,
      subject: "Notification on points rewarded from an event",
      html: `Hi! <br> <br> Notifying you that for going to ${event}, 
      you just have received ${pointsRewarded}`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error in sending student email");
  }
};
