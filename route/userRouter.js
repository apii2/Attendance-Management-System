const express = require("express");
const router = express.Router();

const UserController = require('../controller/userController');

router.get('/signup',UserController.signup);
router.get('/login',UserController.login);

module.exports = router