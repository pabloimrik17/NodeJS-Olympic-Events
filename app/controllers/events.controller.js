module.exports = {

    showEvents: (req, res) => {
        const events = [
            { name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.' },
            { name: 'Swimming', slug: 'swimming', description: 'Michael Phelps is the fast fish.' },
            { name: 'Weightlifting', slug: 'weightlifting', description: 'Lifting heavy things up' }
        ];

        res.render('pages/events', { events: events});
    },

    showEvent: (req, res) => {
        const event = { name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.' };

        res.render('pages/event', { event: event});
    }

};
