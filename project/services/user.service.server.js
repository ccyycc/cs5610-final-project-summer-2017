const app = require('../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

// var FacebookStrategy = require('passport-facebook').Strategy;
// var facebookConfig = {
//     clientID     : process.env.FACEBOOK_CLIENT_ID,
//     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL  : process.env.FACEBOOK_CALLBACK_URL
// };
//
// passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));



// start all url with '/aps' ('/rest' is also popular)
// :userId: path params
app.get('/api/user/:userId', findUserById);
app.get('/api/user', isAdmin, findAllUsers);

app.post('/api/user', isAdmin, createUser);
app.put('/api/user/:userId', isAdmin, updateUser);
app.delete('/api/user/:userId', isAdmin, deleteUser);
app.get('/api', function (req, res) {
    res.send('123');
});

app.post('/api/login', passport.authenticate('local'), login);
app.get('/api/loggedin', loggedin);
app.post('/api/logout', logout);
app.post('/api/register', register);
app.get('/api/checkAdmin', checkAdmin);
app.delete('/api/unregister', unregister);
app.put('/api/update', updateProfile);

app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

// app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
// app.get('/auth/facebook/callback',
//     passport.authenticate('facebook', {
//         successRedirect: '/#/user',
//         failureRedirect: '/#/login'
//     }));


function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}


//////////actural function/////////////////

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        })
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    // user.password = passw
    userModel
        .createUser(user)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function loggedin(req, res) {
    // console.log(req.user);
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkAdmin(req, res) {
    // console.log(req.user);
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username)
        .then(function (user) {
            if (user && bcrypt.compareSync(password, user.password)) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}

function login(req, res) {
    res.json(req.user);
}


function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}


function updateUser(req, res) {
    var user = req.body;
    console.log(user);
    var userId = req.params.userId;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.send(status);
        })


}

function updateProfile(req, res) {
    var user = req.body;
    // console.log(user);
    // var userId = req.params.userId;

    userModel
        .updateUser(req.user._id, user)
        .then(function (status) {
            res.send(status);
        })


}


function createUser(req, res) {
    var user = req.body;
    if (!user.password) {
        user.password = 'password';
    }
    user.password = bcrypt.hashSync(user.password);

    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}


function findUserById(req, res) {
    var userId = req.params.userId;

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function findAllUsers(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user) {
                    res.json(user)
                        .sendStatus(200);
                } else {
                }
                res.sendStatus(404);
            });

    } else if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user) {
                    res.json(user)
                } else {
                }
                res.sendStatus(404);
            })

    }
    else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
        // res.json(users);
    }


}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}


////////////////Google/////////////////////
function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username: emailParts[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        google: {
                            id:    profile.id,
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


function facebookStrategy(token, refreshToken, profile, done) {
    developerModel
        .findUserByFacebookId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    console.log(profile);
                }
            }
        )
}