const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../configs/jwtConfigs");
const mail = require("../configs/emailingConfig");
const User = require("../Controls/user.js");
const UserModel = require("../Model/userModel");
router.post("/setup-user", async (req, res) => {
  try {
    if (await UserModel.findOne({ email: req.body.email })) {
      res.status(409).json({ error: "Account Seems To Have Already Been Made" });
    } else {
      const password = await bcrypt.hash(req.body.password, 10);
      res.json({ email: req.body.email, name: req.body.name, password: password });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
router.post("/register", async (req, res) => {
  await User.createUser(req, res);
});
router.post("/login", async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  try {
    //check if User exists
    if (user != null && bcrypt.compare(req.body.password, user.password)) {
      const userdata = {
        userID: user._id,
        userSchoolCode: user.schoolCode,
        userPermissions: user.accessPermisions,
      };
      user.refreshTokens = [];
      await user.save();
      const accessToken = auth.generateAccessToken(userdata);
      const refreshToken = await auth.generateRefreshToken(userdata);
      return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken }); 
    } else {
      throw new Error("Username or Password is wrong");
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
router.post("/forgotPassword", async (req, res) => {});
router.post("/sendVerifyEmail", async (req, res) => {
  try {
    await mail.sendVerificationEmail(req.body.email, req.body.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/getUser", auth.authenticateToken, async (req, res) => {
  await User.getUser(req, res);
});
router.get("/verifyEmail/:token", async (req, res) => {
  try {
    const { id } = auth.verifyToken(req.params.token, process.env.EMAIL_VERTIFICATION_TOKEN);
    console.log(id);
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: "Email address already verified." });
    }

    const now = Date.now();
    const tokenIssuedAt = new Date(jwt.decode(req.params.token).iat * 1000);
    const tokenExpiresAt = new Date(tokenIssuedAt.getTime() + 15 * 60 * 1000);

    if (now > tokenExpiresAt) {
      await user.remove();
      throw new Error("Verification link has expired. And Now Your Account Has Been Deleted");
    }

    user.emailVerified = true;
    await user.save();

    res.status(200).json({ message: "Email address verified successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/updateUser", async (req, res) => {
  User.updateUser(req, res);
});

module.exports = router;
