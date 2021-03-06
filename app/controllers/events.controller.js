const Event = require('../models/event.model');

module.exports = {
    showEvents: showEvents,
    showEvent: showEvent,
    seedEvents: seedEvents,
    showCreateEvent: showCreateEvent,
    createEvent: createEvent,
    showEditEvent: showEditEvent,
    editEvent: editEvent,
    deleteEvent: deleteEvent
};

function showEvents(req, res) {
    Event.find({}, (err, events) => {
        if(err) {
            res.status(404);
            res.send('Events not found');
        }

        res.render('pages/events/events', {
            events: events,
            success: req.flash('success')
        });
    })
}

function showEvent(req, res) {
    Event.findOne({slug: req.params.slug}, (err, event) => {
        if(err) {
            res.status(404);
            res.send('Event not found');
        }

        res.render('pages/events/event', {
            event: event,
            success: req.flash('success')
        });
    })
}

function showCreateEvent(req, res) {
    res.render('pages/events/createEvent', {
        errors: req.flash('errors')
    })
}

function createEvent(req, res) {

    req.checkBody('name', 'Name is required').notEmpty(); // Express Validator
    req.checkBody('description', 'Description is required').notEmpty(); // Express Validator

    const errors = req.validationErrors();
    if(errors) {
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect('/events/create');
    }

    const event = new Event({
        name: req.body.name,
        description: req.body.description
    });

    event.save((err) => {
        if(err){
            throw err;
        }

        req.flash('success', 'Successfully created event!');
        res.redirect(`/events/${event.slug}`);
    });
}

function showEditEvent(req, res) {
    Event.findOne({slug: req.params.slug}, (err, event) => {
        res.render('pages/events/editEvent', {
            event: event,
            errors: req.flash('errors')
        });
    });
}

function editEvent(req, res) {

    req.checkBody('name', 'Name is required').notEmpty(); // Express Validator
    req.checkBody('description', 'Description is required').notEmpty(); // Express Validator

    const errors = req.validationErrors();
    if(errors) {
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect(`/events/${req.params.slug}/edit`);
    }

    Event.findOne({slug: req.params.slug}, (err, event) => {
        event.name = req.body.name;
        event.description = req.body.description;

        event.save((err) => {
            if(err) {
                throw err;
            }

            req.flash('success', 'Successfully upated event.');
            res.redirect('/events');
        })
    });
}

function seedEvents(req, res) {

    const events = [
        {name: 'Basketball', description: 'Throwing into a basket.'},
        {name: 'Swimming', description: 'Michael Phelps is the fast fish.'},
        {name: 'Weightlifting', description: 'Lifting heavy things up'},
        {name: 'Ping Pong', description: 'Super fast paddles'}
    ];

    Event.remove({}, () => {
        for (event of events) {
            var newEvent = new Event(event);
            newEvent.save();
        }
    });

    res.send("Database seeded!");
}

function deleteEvent(req, res) {

    Event.remove({slug: req.params.slug}, (err) => {
        if(err) {
            throw err;
        }

        req.flash('success', 'Event deleted');
        res.redirect('/events')
    })
}