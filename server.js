var app = require('./express');
var bodyParser = require('body-parser');

//different package for different passport strategy
//passport-local, passport-facebook..etc

//passport depends on session, session depends on cookie
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));


require('./server/app');

var port = process.env.PORT || 3000;

app.listen(port);