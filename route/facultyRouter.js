const express = require("express");
const router = express.Router();
const FacultyController = require("../controller/facultyController");

router.post('/create',FacultyController.create);
router.post('/delete/:id',FacultyController.delete);
router.put('/update/:id',FacultyController.update);
router.get('/all',FacultyController.getAll);
router.get('/:id',FacultyController.getById);
router.get('/search/:search',FacultyController.search);

module.exports = router;