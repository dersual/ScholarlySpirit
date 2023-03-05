const express = require("express");
const router = express.Router();
const Student = require("../Controls/student");
const studentModel = require("../Model/studentModel");
const auth = require("../configs/jwtConfigs");
router.post("/uploadStudents", auth.authenticateToken, async (req, res) => {
  try {
  } catch (error) {}
});
router.get("/getStudents", auth.authenticateToken, async (req, res) => {
  try {
  } catch (error) {}
});
router.get("/getStudent", auth.authenticateToken, async (req, res) => {
  try {
  } catch (error) {}
});
module.exports = router;
