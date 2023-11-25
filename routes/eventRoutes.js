const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventController');
const {fileUpload} = require('../middleware/fileUpload');
const {isLoggedIn, isAuthor} = require('../middleware/auth');
const {validateId} = require('../middleware/validator');

router.get('/', controller.index);

router.get('/new', isLoggedIn, controller.new);

router.post('/', isLoggedIn, fileUpload, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

router.put('/:id', validateId, isLoggedIn, fileUpload, controller.update);

router.delete('/:id', validateId, isLoggedIn, controller.delete);

module.exports = router;
