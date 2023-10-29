const eventModule = require('../models/event'); // import event module
const Event = eventModule.Event; // get Event model

exports.index = (req, res, next) => {
    const categories = eventModule.categories;
    // Use the Event model to find events in the database
    Event.find()
        .then((events) => {
            res.render('./events/index', {
                cssFileName: 'events',
                categories: categories,
                events: events,
                title: 'Events'
            });
        })
        .catch((err) => {
            next(err);
        });
};

exports.new = (req, res) => {
    const categories = eventModule.categories;
    res.render('./events/new', {
        cssFileName: 'newEvent',
        title: 'New Event',
        categories: categories
    });
};

exports.show = (req, res, next) => {
    const id = req.params.id;

    Event.findById(id)
        .then(event => {
            if (event) {
                res.render('./events/show', {
                    cssFileName: 'event',
                    event: event,
                    title: event.title,
                    dateTime: event.formatDateTime(event.start, event.end)
                });
            } else {
                const err = new Error('Cannot find event with ID ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};


exports.create = (req, res, next) => {
    // Create a new event instance using the request body
    const newEvent = new Event(req.body);
    if (req.file) {
        newEvent.image = req.file.filename;
    }
    newEvent.save()
        .then((event) => {
            console.log('Event created');
            res.redirect('/events');
        })
        .catch((err) => {
            next(err);
        });
};

exports.edit = (req, res, next) => {
    const categories = eventModule.categories;
    const id = req.params.id;
    
    Event.findById(id)
        .then(event => {
            if (event) {
                res.render('./events/edit', {
                    cssFileName: 'newEvent',
                    event: event, 
                    categories: eventModule.categories,
                    title: `Editing ${event.title}...`
                });
            } else {
                const err = new Error('Cannot find event with ID ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};


exports.update = (req, res, next) => {
    const id = req.params.id;
    const updatedEvent = req.body;

    Event.findByIdAndUpdate(id, updatedEvent, { new: true })
        .then(event => {
            if (event) {
                res.redirect('/events/' + id);
            } else {
                const err = new Error('Cannot find event with ID ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};


exports.delete = (req, res, next) => {
    const id = req.params.id;

    Event.findByIdAndRemove(id)
        .then(event => {
            if (event) {
                res.redirect('/events');
            } else {
                const err = new Error('Cannot find event with ID ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};


