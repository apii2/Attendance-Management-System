const express = require("express");
const router = express.Router();

const TeacherController = require('../controller/teacherController');
const AuthController = require('../controller/AuthController');

router.get('/all', AuthController.adminAuth ,TeacherController.getAll);

module.exports = router;