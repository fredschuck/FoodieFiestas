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
        req.flash('error', 'You are already logged in');
        return next();
    } else {
        req.flash('error', 'You have not logged in');
        res.redirect('/user/login');
    }
};

// Check if user is author of event
exports.isAuthor = (req, res, next) => {
    let id = req.params.id;
    Event.findById(id)
        .then(event=>{
            // if (event) {
                if(event.author == req.session.user) {
                    return next();
                } else {
                    let err = new Error('You are not authorized to perform this action');
                    err.status = 401;
                    return next(err);
                }
            // } else {
            //     let err = new Error('Cannot find a event with id ' + id);
            //     err.status = 404;
            //     return next(err);
            // }
        })
        .catch(err=>next(err));
};