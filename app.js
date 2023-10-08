// require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mainRoutes = require('./routes/mainRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const port = 3000;
const host = 'localhost';
// const port = process.env.PORT || 3000;
// const host = process.env.HOST || 'localhost';

app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny')); 
app.use(methodOverride('_method'));

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});

// Routes ***********************
app.use('/', mainRoutes);
app.use('/events', eventRoutes);


// Error Handling ***************
// app.use((req, res, next) => {
//     let err = new Error('The server cannot locate ' + req.url);
//     err.status = 404;
//     next(err);
// });

// app.use((err, req, res, next) => {
//     if(!err.status) {
//         err.status = 500;
//         err.message = ('Internal Server Error');
//     }
//     res.status(err.status);
//     res.render('error', { 
//         error: err,
//         cssFileName: 'error',
//         title: 'Error'});
// });
