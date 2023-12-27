const express = require("express");
const router = express.Router();
const semisterController = require('../controller/semisterController');

router.post('/create',semisterController.create);
router.get('/search/:search',semisterController.search);
router.put('/update/:id',semisterController.update);
router.post('/delete/:id',semisterController.delete);
router.get('/all',semisterController.getAll);
router.get('/:id',semisterController.getById);


module.exports = router