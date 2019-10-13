var express = require('express');
var router = express.Router();
const commentsController = require('../controllers/commentsController');
const checkAuth = require('../middleware/checkAuth')

router.get('/', commentsController.getComments)

router.post('/edit', checkAuth, commentsController.updateComment);

router.post('/', checkAuth, commentsController.addComment);

module.exports = router;
