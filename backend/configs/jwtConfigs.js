const jwt = require("jsonwebtoken");
const crypto = require("crypto");
//require('crypto').randomBytes(64).toString('hex')
const accessTokenSecret_Key = process.env.ACCESS_TOKEN;
const refreshTokenSecret_Key = process.env.REFRESH_TOKEN;
const emailVertificationTokenSecret_Key = process.env.EMAIL_VERTIFICATION_TOKEN;
const accessTokenLife = '15m';
const refreshTokenLife = '1d';
const emailTokenLife = '15m';
async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status("401").json({ error: "User not found" });
  }
  try {
    const userData = jwt.verify(token, accessTokenSecret_Key);
    req.user = userData;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

module.exports = {
  accessTokenLife,
  refreshTokenSecret_Key,
  emailVertificationTokenSecret_Key,
  accessTokenLife,
  refreshTokenLife,
  emailTokenLife,
  generateAccessToken: (payload) => {
    console.log(payload, accessTokenSecret_Key, accessTokenLife);
    return jwt.sign(payload, accessTokenSecret_Key, { expiresIn: accessTokenLife });
  },
  generateRefreshToken: (payload) => {
    console.log(payload, refreshTokenSecret_Key, refreshTokenLife);
    return jwt.sign(payload, refreshTokenSecret_Key, { expiresIn: refreshTokenLife });
  },
  generateEmailVertificationToken: (payload) => {
    console.log(typeof emailTokenLife, emailTokenLife);
    return jwt.sign(payload, emailVertificationTokenSecret_Key, { expiresIn: emailTokenLife });
  },
  verifyToken: (token, secret) => {
    return jwt.verify(token, secret);
  },
  authenticateToken,
};
