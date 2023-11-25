const Event = require('../models/event');

// Check if user is guest
exports.isGuest = (req, res, next) => {
    if (!req.session.user){
        return next();
    } else {
        req.flash('error', 'You have already logged in');
        res.redirect('/user/profile');
    }
};

// Check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user){
        return next();
    } else {
        req.flash('error', 'You have not logged in');
        res.redirect('/user/login');
    }
};

// Check if user is author of event
exports.isAuthor = (req, res, next) => {
    let id = req.params.id;
    Event.Event.findById(id)
        .then(story => {
            if(story) {
                if(story.host == req.session.user) {
                next();
                } else {
                let err = new Error('Unauthorized Access to resource');
                err.status = 401;
                next(err);
                }
            } else {
                let err = new Error(`Cannot find event with id ${id}`);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
    };

