const express = require("express");
const router = express.Router();

const SubjectController = require('../controller/subjectController');

router.post('/create',SubjectController.create);

module.exports = router;