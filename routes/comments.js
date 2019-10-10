var express = require('express');
var router = express.Router();
const commentsController = require('../controllers/commentsController');

router.post('/', commentsController.addComment);

router.post('/edit', commentsController.updateComment);

module.exports = router;
