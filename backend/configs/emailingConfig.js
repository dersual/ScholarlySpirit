const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
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
    const token = auth.generateEmailVertificationToken({id});
    const verificationLink = `http://localhost:3000/verifyEmail/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email address",
      html: `Click <a href="${verificationLink}">here</a> to verify your email address.`,
    };
    await transporter.sendMail(mailOptions); 
    return `Mail sent`
  } catch (error) {
    console.error(error); 
    throw new Error(error)
  }
};
exports.sendGuideEmail = (email, id) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Short Guide on how to use Scholarly Spirit",
    html: `Hi`,
  };
};
