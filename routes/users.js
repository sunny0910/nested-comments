var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.userSignUp);

router.post('/login', userController.userLogIn);

router.get('/:userId', userController.getUser);

router.get('/', userController.users);

module.exports = router;
