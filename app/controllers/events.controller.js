const Event = require('../models/event.model');

module.exports = {
    showEvents: showEvents,
    showEvent: showEvent,
    seedEvents: seedEvents,
    showCreateEvent: showCreateEvent,
    createEvent: createEvent
};

function showEvents(req, res) {
    Event.find({}, (err, events) => {
        if(err) {
            res.status(404);
            res.send('Events not found');
        }

        res.render('pages/events/events', {events: events});
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
    res.render('pages/events/createEvent')
}

function createEvent(req, res) {
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
