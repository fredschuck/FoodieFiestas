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
    let password = req.body.password;
    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log('wrong email address');
            req.flash('error', 'wrong email address');  
            res.redirect('/user/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/user/profile');
            } else {
                req.flash('error', 'wrong password');      
                res.redirect('/user/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([User.findById(id), Event.Event.find({'host': id})])
    .then(result => {
        const [user, events] = result; 
        res.render(`./user/profile`, {
            cssFileName: 'users',
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
    else {
      req.flash('success', 'Successfully Logged Out');
      res.redirect('/')
    };  
  });
};


