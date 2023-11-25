const User = require('../models/user');
const Event = require('../models/event');


exports.new = (req, res)=>{
  res.render('./user/new', {
    cssFileName: 'users',
    title: 'Sign Up'
  });
};

exports.create = (req, res, next)=>{
    let user = new User(req.body);
    if (req.body.email) user.email = req.body.email.toLowerCase();
    console.log(user);
    user.save()
    .then(user=> {
        req.flash('success', 'Account Created');
        res.redirect('/user/login');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            res.redirect('/user/new');
        }
        if(err.code === 11000) {
            req.flash('error', 'Email is already in use');  
            res.redirect('/user/new');
        }
        next(err);
    }); 
};

exports.loginForm = (req, res, next) => {
    res.render('./user/login', {
        cssFileName: 'users',
        title: 'Login'
    });
}

exports.login = (req, res, next)=>{
    let email = req.body.email;
    if(email) email = email.toLowerCase();
    let password = req.body.password;
    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            req.flash('error', 'email address does not exist');  
            res.redirect('/user/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.session.userName = user.firstName + ' ' + user.lastName;
                    req.session.firstName = user.firstName;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/user/profile');
            } else {
                req.flash('error', 'incorrect password');      
                res.redirect('/user/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([User.findById(id), Event.Event.find({'author': id})])
    .then(result => {
        const [user, events] = result; 
        res.render(`./user/profile`, {
            cssFileName: 'profile',
            user: user,
            events: events,
            title: `${user.firstName}'s Profile`
        });
    })
    .catch(err=>next(err));
};


exports.logout = (req, res, next)=>{
  req.session.destroy(err=>{
    if(err) next(err);
    else res.redirect('/'); 
  });
};


