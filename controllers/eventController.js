const User = require('../models/user');
const eventModule = require('../models/event'); // import event module
const Event = eventModule.Event; // get Event model

exports.index = (req, res, next) => {
    const categories = eventModule.categories;
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
    
    // if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    //     const err = new Error('Invalid event ID');
    //     err.status = 400;
    //     next(err);
    // }
    Event.findById(id)
        .then(event => {
            if (event) {
                console.log("User " + req.session.user);
                console.log("Author " + event.author);
                res.render('./events/show', {
                    cssFileName: 'event',
                    event: event,
                    title: event.title,
                    dateTime: event.formatDateTime(event.start, event.end)
                });
            } else {
                const err = new Error('Cannot find event with ID: ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};


exports.create = (req, res, next) => {
    const newEvent = new Event(req.body);
    newEvent.host = req.session.userName;
    newEvent.author = req.session.user;
    const missingFields = [];

    if (!newEvent.category) {
        missingFields.push('Event category');
    } else if (!eventModule.validateCategory(newEvent.category)) {
        missingFields.push('Event category <' + newEvent.category + '> is not a valid category');
    }
    if (!newEvent.title) {
        missingFields.push('Event title');
    }
    if (!newEvent.start) {
        missingFields.push('Event start time');
    }
    if (!newEvent.end) {
        missingFields.push('Event end time');
    }
    if (!newEvent.details) {
        missingFields.push('Event details');
    }
    if (!newEvent.location) {
        missingFields.push('Event location');
    }
    if (!req.file) {
        missingFields.push('Image for event');
    }
    if (missingFields.length > 0) {
        const err = new Error(`Missing required fields: ${missingFields.join(', ')}`);
        err.status = 400;
        next(err);
    }
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

exports.edit = (req, res, next) => { // NEEDS TO BE FIXED - IMAGE UPDATE NOT WORKING
    const id = req.params.id;
    Event.findById(id)
        .then(event => {
            if (event) {
                res.render('./events/edit', {
                    cssFileName: 'newEvent',
                    event: event, 
                    categories: eventModule.categories,
                    title: `Editing ${event.title}...`,
                    start: event.processDateTime(event.start),
                    end: event.processDateTime(event.end)
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
    // if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    //     const err = new Error('Invalid event ID');
    //     err.status = 400;
    //     next(err);
    // }
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