const express = require("express");
const router = express.Router();

const semesterController = require('../controller/semesterController');
const AuthController = require('../controller/AuthController');

router.post('/create',AuthController.adminAuth,semesterController.create);
router.get('/search/:search',semesterController.search);
router.put('/update/:id',AuthController.adminAuth,semesterController.update);
router.post('/delete/:id',AuthController.adminAuth,semesterController.delete);
router.get('/all',semesterController.getAll);
router.get('/id/:id',semesterController.getById);

module.exports = router;