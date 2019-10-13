var express = require('express');
var router = express.Router();
const commentsController = require('../controllers/commentsController');

router.get('/', commentsController.getComments)

router.post('/edit', commentsController.updateComment);

router.post('/', commentsController.addComment);

module.exports = router;
