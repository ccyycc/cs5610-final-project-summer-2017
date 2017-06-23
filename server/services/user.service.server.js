var app = require('../../express');
var bcrypt = require("bcrypt-nodejs");
var userModel = require('../models/user/user.model.server');

// var facebookConfig = {
//     clientID: process.env.FACEBOOK_CLIENT_ID,
//     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//     profileFields: ['id', 'last_name', 'first_name', 'email']
// };
//
// var googleConfig = {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL
// };

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new LocalStrategy(localStrategy));
// passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
// passport.use(new GoogleStrategy(googleConfig, googleStrategy));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

//for dynamic data

//:userId :path param
//another type is query param

app.post('/api/user', createUser);
app.get('/api/user', isAdmin, findAllUsers);
/* can't enter this section, because all the url will go
 straight into the above */
app.get('/api/user', findUserByCredentials);
app.get('/api/user', findUserByUsername);
/*------------------------------------------------------*/
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);
// app.post('/api/user', findAllUsers);

//intercepting the http request and the login function
app.post('/api/login', passport.authenticate('local'), login);
app.get('/api/loggedin', loggedIn);
app.post('/api/logout', logout);
app.post('/api/register', register);
app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/assignment/assignment6/index.html#!/profile',
    failureRedirect: '/assignment/assignment6/index.html#!/login'
}));
app.get('/api/checkadmin', checkAdmin);
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/assignment6/index.html#!/profile',
        failureRedirect: '/assignment/assignment6/index.html#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var newGoogleUser = {
                        username: email,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        google: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'ADMIN') {
        next();
    } else {
        res.sendStatus(401);
    }
}

function checkAdmin(req, res) {
    //req.user.roles.indexOf('ADMIN') > -1
    if (req.isAuthenticated() && req.user.role === 'ADMIN') {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {

                    var email = profile.emails[0].value;
                    // var emailParts = email.split("@");
                    var newFacebookUser = {
                        username: email,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    // console.log(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (err) {
                if (err) {
                    res.sendStatus(400).send(err);
                } else {
                    res.send(user);
                }
            })
        });
}

function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function loggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function serializeUser(user, done) {
    //send the entire user over to the cookie
    //could send fields
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(function (user) {
            done(null, user);
        }, function (err) {
            done(err, null);
        })
}

//callback function in localStrategy to go back to passport
function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user && bcrypt.compareSync(password, user.password)) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        })
}

function login(req, res) {
    res.json(req.user);
}

function findUserById(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function () {
            res.sendStatus(500);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function () {
            res.sendStatus(500);
        });
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId, user)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(500);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(500);
        });
}


function findUserByUsername(username, res) {
    // var username = req.query.username;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function () {
            res.sendStatus(500);
        });
}

function findUserByCredentials(username, password, res) {
    // var username = req.query.username;
    // var password = req.query.password;
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function () {
            res.sendStatus(500);
        });
}

function findAllUsers(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    if (username && password) {
        findUserByCredentials(username, password, res);
    } else if (username) {
        findUserByUsername(username, res);
    } else {
        userModel
            .findAllUser()
            .then(function (users) {
                // console.log(users);
                res.json(users);
            }, function () {
                res.sendStatus(500);
            })
    }
    // } else {
    //     res.sendStatus(404);
    // }
}