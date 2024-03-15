const express = require("express");
const router = express.Router();

const AttendanceController = require('../controller/AttendanceController');
const AuthController = require('../controller/AuthController');

router.post("/attend/:subjectID",AuthController.userAuth,AttendanceController.attend);
router.post("/generate",
// AuthController.userAuth,
AttendanceController.generate);
router.post("/generate/date",
// AuthController.userAuth,
AttendanceController.generateByDate);

module.exports = router;