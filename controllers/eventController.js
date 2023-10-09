const model = require('../models/event'); 

exports.index = (req, res) => {
    let categories = model.getCategories(); 
    let events = model.find(); 
    console.log('Hello World');
    res.render('./events/index', {
        cssFileName: 'events',
        categories: categories,
        events: events,
        title: 'Events'
    });
};

exports.new = (req, res) => {
    res.render('./events/new', {
        cssFileName: 'newEvent',
        title: 'New Event',
        categories: model.getCategories()
    });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let event = model.findByID(id);
    if(event) {
    res.render('./events/show', {
        cssFileName: 'event',
        event: event,
        title: event.title,
        dateTime: model.formatDateTime(event.start, event.end)
    }); 
    } else {
        let err = new Error('Cannot find event with ID ' + id);
        err.status = 404;
        next(err); 
    }
};

exports.create = (req, res, next) => {
    const newEvent = req.body;
    const uploadedImage = req.file;
    let event = {
        id: String(model.find().length + 1 + ''),
        category: newEvent.category || 'No Category',
        title: newEvent.title || 'No Title',
        host: newEvent.host || 'Host Unknown',
        location: newEvent.location || 'Location Unknown',
        start: newEvent.start || 'Start Time Unknown',
        end: newEvent.end || 'End Time Unknown',
        details: newEvent.details || 'No Details',
        image: uploadedImage.filename || 'Error',
    }
    model.create(event);
    console.log('Event created ');
    res.redirect('/events');
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let event = model.findByID(id);
    if(event) {
        res.render('./events/edit', {
            cssFileName: 'newEvent',
            event: event, 
            categories: model.getCategories(),
            title: `Editing ${event.title}...`
        });
    } else {
        let err = new Error('Cannot find event with ID ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next) => {
    let event = req.body;
    console.log(event);
    let uploadedImage = req.file;
    let id = req.params.id;
    let updateIsSuccessful = model.updateByID(id, event, uploadedImage);
    if (updateIsSuccessful){ 
        res.redirect('/events/'+id);
    } else {
        let err = new Error('Cannot find event with ID ' + id);
        err.status = 404;
        next(err);
    }
}; 

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (model.deleteByID(id)){
        res.redirect('/events');
    } else {
        let err = new Error('Cannot find event with ID ' + id);
        err.status = 404;
        next(err);
    }
}

