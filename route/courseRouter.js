const express = require("express");
const router = express.Router();

const CourseController = require('../controller/courseController');
const AuthController = require('../controller/AuthController')


router.post('/create',AuthController.adminAuth,CourseController.create);
router.post('/delete/:id',AuthController.adminAuth,CourseController.delete);
router.get('/all',CourseController.getAll);
router.get('/id/:id',CourseController.getById);
router.get('/search/:search',CourseController.search);
router.put('/update/:id',AuthController.adminAuth,CourseController.update);

module.exports = router