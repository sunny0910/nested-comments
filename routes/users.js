var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/checkAuth')

router.post('/signup', userController.userSignUp);

router.post('/login', userController.userLogIn);

router.get('/:userId', checkAuth, userController.getUser);

router.get('/', checkAuth, userController.users);

module.exports = router;
