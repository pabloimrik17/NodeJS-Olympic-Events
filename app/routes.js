const express = require('express');
const router = express.Router();

const mainController = require('./controllers/main.controller');
const eventsController = require('./controllers/events.controller');

router.get('/', mainController.showHome);

router.get('/events', eventsController.showEvents);
router.get('/events/seed', eventsController.seedEvents);

router.get('/events/create', eventsController.showCreateEvent);
router.post('/events/create', eventsController.createEvent);

router.get('/events/:slug', eventsController.showEvent);

router.get('/events/:slug/edit', eventsController.showEditEvent);
router.post('/events/:slug', eventsController.editEvent);

module.exports = router;
