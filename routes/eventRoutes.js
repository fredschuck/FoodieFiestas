const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventController');
const {fileUpload} = require('../middleware/fileUpload');
const {isLoggedIn, isAuthor} = require('../middleware/auth');

router.get('/', controller.index);

router.get('/new', isLoggedIn, controller.new);

router.post('/', isLoggedIn, fileUpload, controller.create);

router.get('/:id', controller.show);

router.get('/:id/edit', isLoggedIn, isAuthor, controller.edit);

router.put('/:id', isLoggedIn, fileUpload, controller.update);

router.delete('/:id', isLoggedIn, controller.delete);

module.exports = router;
