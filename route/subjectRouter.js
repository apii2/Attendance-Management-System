const express = require("express");
const router = express.Router();

const SubjectController = require('../controller/subjectController');
const AuthController = require('../controller/AuthController');

router.post('/create',AuthController.adminAuth,SubjectController.create);
router.post('/delete/:id',AuthController.adminAuth,SubjectController.delete);
router.get('/all',SubjectController.getAll);
router.get('/id/:id',SubjectController.getById);
router.get('/search/:search',SubjectController.search);
router.put('/update/:id',AuthController.adminAuth,SubjectController.update);
router.put('/time/:id',AuthController.adminAuth,SubjectController.setTimer);


module.exports = router;