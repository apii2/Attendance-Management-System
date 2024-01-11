const express = require("express");
const router = express.Router();

const UserController = require('../controller/userController');
const AuthController = require('../controller/AuthController');

router.post('/signup',UserController.signup);
router.post('/login',UserController.login);
router.post('/refresh',UserController.refresh);
router.get('/all', AuthController.adminAuth ,UserController.getAll);
router.get('/id/:id',AuthController.adminAuth,UserController.getByid);
router.get('/search/:search',AuthController.adminAuth,UserController.search);
router.put('/update/:id',
AuthController.userAuth,
UserController.update);
router.put('/delete/:id',AuthController.adminAuth,UserController.delete);
router.put('/change/teacher/:id',AuthController.adminAuth,UserController.changeToTeacher);
router.put('/change/admin/:id',AuthController.adminAuth,UserController.changeToAdmin);
router.put('/change/from/teacher/:id',AuthController.adminAuth,UserController.teacherToStudent);
router.put('/faculty/assign/:id',AuthController.adminAuth,UserController.setFaculty);

module.exports = router;