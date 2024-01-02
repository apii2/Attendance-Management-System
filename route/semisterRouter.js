const express = require("express");
const router = express.Router();

const semisterController = require('../controller/semisterController');
const AuthController = require('../controller/AuthController');

router.post('/create'
// ,AuthController.adminAuth
,semisterController.create);
router.get('/search/:search',semisterController.search);
router.put('/update/:id'
// ,AuthController.adminAuth
,semisterController.update);
router.post('/delete/:id'
// ,AuthController.adminAuth
,semisterController.delete);
router.get('/all',semisterController.getAll);
router.get('/:id',semisterController.getById);

module.exports = router;