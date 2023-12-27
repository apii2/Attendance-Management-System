const express = require("express");
const router = express.Router();

const CourseController = require('../controller/courseController');

router.post('/create',CourseController.create);
router.post('/delete/:id',CourseController.delete);
router.get('/all',CourseController.getAll);
router.get('/id/:id',CourseController.getById);
router.get('/search/:search',CourseController.search);
router.put('/update/:id',CourseController.update);

module.exports = router