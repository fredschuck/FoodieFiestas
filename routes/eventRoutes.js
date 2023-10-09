const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventController');
const {fileUpload} = require('../middleware/fileUpload');

// GET /events: send all events to the client
router.get('/', controller.index);

// GET /events/new: send form to create new event
router.get('/new', controller.new);

// POST /events: create a new event
router.post('/', fileUpload, controller.create);

// GET /events/:id: send details of event by ID
router.get('/:id', controller.show);

// GET /events/:id/edit: send form to edit event by ID
router.get('/:id/edit', controller.edit);

// PUT /events/:id: update event by ID
router.put('/:id', fileUpload, controller.update);

// DELETE /events/:id: delete event by ID
router.delete('/:id', controller.delete);

module.exports = router;
