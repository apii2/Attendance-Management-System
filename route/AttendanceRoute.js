const express = require("express");
const router = express.Router();

const AttendanceController = require('../controller/AttendanceController');

const AuthController = require('../controller/AuthController')

router.post("/attend/:subjectID",AuthController.userAuth,AttendanceController.attend);

module.exports = router