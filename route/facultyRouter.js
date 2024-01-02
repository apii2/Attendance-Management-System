const express = require("express");
const router = express.Router();

const AuthController = require('../controller/AuthController');
const FacultyController = require("../controller/facultyController");

router.post('/create'
// ,AuthController.adminAuth
,FacultyController.create);
router.post('/delete/:id'
// ,AuthController.adminAuth
,FacultyController.delete);
router.put('/update/:id'
// ,AuthController.adminAuth
,FacultyController.update);
router.get('/all',FacultyController.getAll);
router.get('/:id',FacultyController.getById);
router.get('/search/:search',FacultyController.search);

module.exports = router;