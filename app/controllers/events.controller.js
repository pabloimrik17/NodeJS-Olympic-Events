const Event = require('../models/event.model');

module.exports = {
    showEvents: showEvents,
    showEvent: showEvent,
    seedEvents: seedEvents
};

function showEvents(req, res) {
    Event.find({}, (err, events) => {
        res.render('pages/events', {events: events});
    })
}

function showEvent(req, res) {
    const event = {name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.'};

    res.render('pages/event', {event: event});
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
