const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

require('./Configurations/config');

const app = express();

// Load routes
const index = require('./Routes');
const user = require('./Routes/user');
const secret = require('./Routes/secret');
const email = require('./Routes/email');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', index);
app.use('/user', user);
app.use('/secret', secret);
app.use('/send', email);


// Start the server
const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Server listening at ${port}`);
