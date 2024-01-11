const express = require("express");
const router = express.Router();

const AssignmentController = require('../controller/AssignmentController');
const AuthController = require('../controller/AuthController')

router.post("/add/:subjectID",AuthController.teacherAuth,AssignmentController.create);
router.put("/update/:id",AuthController.teacherAuth,AssignmentController.update);

module.exports = router