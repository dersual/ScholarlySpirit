const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const accessTokenSecret_Key = process.env.ACCESS_TOKEN;
const refreshTokenSecret_Key = process.env.REFRESH_TOKEN;
const emailVertificationTokenSecret_Key = process.env.EMAIL_VERTIFICATION_TOKEN;
const accessTokenLife = "15m";
const refreshTokenLife = "1d";
const emailTokenLife = "15m";
const User = require("../Model/userModel");
async function generateAccessToken(payload) {
  return jwt.sign(payload, accessTokenSecret_Key, { expiresIn: accessTokenLife  });
}
async function generateRefreshToken(payload) {
  const refreshToken = jwt.sign(payload, refreshTokenSecret_Key, { expiresIn: refreshTokenLife });
  const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");
  try {
    const user = await User.findOneAndUpdate(
      { _id: payload.userID },
      { $push: { refreshTokens: hashedRefreshToken } },
      { new: true }
    );
    await user.save();
    return refreshToken;
  } catch (error) { 
    console.error(error)
    throw new Error("Refresh Token could not be generated");
  }
}
async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const refreshToken = req.headers["refresh-token"]; 
  if (!token || !refreshToken) {
    return res.status(401).json({ error: "Token or Refresh Token not found" });
  }
  try {
    let userData = jwt.verify(token, accessTokenSecret_Key);
    req.user = userData;
    next();
  } catch (error) {
    //on error check refresh token
    const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const user = await User.findOne({ refreshTokens: hashedRefreshToken });
    if (!user) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    try {
      userData = jwt.verify(refreshToken, refreshTokenSecret_Key);
      req.user = userData;
      // Generate a new refresh token and remove the old one from the user's refreshTokens array
      const oldRefreshTokenIndex = user.refreshTokens.indexOf(hashedRefreshToken);
      if (oldRefreshTokenIndex !== -1) {
        user.refreshTokens.splice(oldRefreshTokenIndex, 1);
        await user.save();
      } 
      const newAccessToken = await generateAccessToken({ 
        userID: user._id,
        userSchoolCode: user.schoolCode,
        userPermissions: user.accessPermisions,
      })
      const newRefreshToken = await generateRefreshToken({
        userID: user._id,
        userSchoolCode: user.schoolCode,
        userPermissions: user.accessPermisions,
      }); 
      res.header("access-token", newAccessToken)
      res.header("refresh-token", newRefreshToken);
      next();
    } catch (error) {  
      console.error(error)
      return res.status(401).json({ error: error.message });
    }
  }
}
module.exports = {
  accessTokenLife,
  refreshTokenSecret_Key,
  emailVertificationTokenSecret_Key,
  accessTokenLife,
  refreshTokenLife,
  emailTokenLife,
  generateAccessToken,
  generateRefreshToken,
  generateEmailVertificationToken: (payload) => {
    return jwt.sign(payload, emailVertificationTokenSecret_Key, { expiresIn: emailTokenLife });
  },
  verifyToken: (token, secret) => {
    return jwt.verify(token, secret);
  },
  authenticateToken,
};
