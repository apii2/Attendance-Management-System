const express = require("express");
const router = express.Router();

const AssignmentController = require('../controller/AssignmentController');
const AuthController = require('../controller/AuthController')

router.post("/add/:subjectID",AuthController.teacherAuth,AssignmentController.create);
router.post("/search/:subjectID",AuthController.userAuth,AssignmentController.search);
router.put("/update/:id",AuthController.teacherAuth,AssignmentController.update);
router.get("/get/:id",
// AuthController.teacherAuth,
AssignmentController.getAssignmentData);

module.exports = router