require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mainRoutes = require('./routes/mainRoutes');
const eventRoutes = require('./routes/eventRoutes');
const mongoose = require('mongoose');

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const db_user = process.env.USER;
const db_password = process.env.PASS;

const uri =  `mongodb+srv://${db_user}:${db_password}@cluster0.t02wymf.mongodb.net/nbda-project3?retryWrites=true&w=majority`;

app.set('view engine', 'ejs');

// connect to MongoDB

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, host, () => {
            console.log(`Server running at http://${host}:${port}/`);
        });
    })
    .catch(err => {
        const customError = new Error('Uh oh! MongoDB connection failed.');
        customError.status = 400;
        throw customError;
    });

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny')); 
app.use(methodOverride('_method'));


// Routes ***********************
app.use('/', mainRoutes);
app.use('/events', eventRoutes);


// Error Handling ***************
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if(!err.status) {
        err.status = 500;
        err.message = ('Internal Server Error');
    }
    res.status(err.status);
    res.render('error', { 
        error: err,
        cssFileName: 'error',
        title: 'Error'});
});