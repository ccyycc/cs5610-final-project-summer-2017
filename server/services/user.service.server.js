var app = require('../../express');
var multer = require('multer');
var upload = multer({dest: __dirname + '/../../public/uploads'});

var userModel = require('../models/user/user.model.server');

const passport = require('passport');
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

// :userId: path params
app.get('/api/user/:userId', findUserById);
app.get('/api/user/findme', findMe);
app.get('/api/userpop/:userId', popUserById);
app.get('/api/checkname', findUserByName);
app.get('/api/user', isAdmin, findAllUsers);

app.post('/api/user', isAdmin, createUser);
//TODO:changed the updateUser, without check isAdmin
app.put('/api/user/:userId', updateUser);

app.delete('/api/user/:userId', isAdmin, deleteUser);

app.post('/api/login', passport.authenticate('local'), login);
app.get('/api/loggedin', loggedin);
app.post('/api/logout', logout);
app.post('/api/register', register);
app.get('/api/checkAdmin', checkAdmin);
app.delete('/api/unregister', unregister);
app.put('/api/update', updateProfile);

app.post('/api/upload', upload.single('myFile'), uploadImage);

app.get('/api/follow/:followingId', follow);
app.get('/api/unfollow/:followingId', unfollow);
app.put('/api/message/:userId', sendMessage);


app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/index.html#!/profile',
        failureRedirect: '/index.html#!/login'
    }));


passport.isAdmin = isAdmin;
passport.isMerchant = isMerchant;
passport.isRecipePro = isRecipePro;


module.exports = passport;

function isRecipePro(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('RECIPEPRO') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}


function isMerchant(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('MERCHANT') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}


//////////actural function/////////////////

function findMe(req, res) {
    userModel
        .findUserById(req.user._id)
        .then(function (user) {
            res.json(user);
        })
}

function findUserByName(req, res) {
    userModel
        .findUserByUsername(req.query.username)
        .then(function (user) {
            if (user) {
                res.json(user)
            } else {
            }
            res.sendStatus(404);
        })
}

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
    // console.log('user.service.server user: ');
    // user.password = passw
    userModel
        .createUser(user)
        .then(function (user) {
            console.log('create user success -- user.server');
            // res.send(user);
            req.login(user, function (status) {
                    res.send(user);
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
    if (req.isAuthenticated() && req.user.role.indexOf('ADMIN') > -1) {
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

function popUserById(req, res) {
    var userId = req.params.userId;

    userModel
        .findById(userId)
        .populate('likedRecipes')
        .populate('collectedProducts')
        .exec()
        .then(function (user) {
            res.json(user);
        });
}

function follow(req, res) {
    var followingId = req.params.followingId;
    var myId = req.user._id;
    console.log("begin-user.service.server-follow " + followingId + " " + myId);

    userModel
        .follow(myId, followingId)
        .then(function (user) {
            res.json(user);
        })

}

function unfollow(req, res) {
    var followingId = req.params.followingId;
    var followerId = req.user._id;
    // console.log("begin-user.service.server-follow " + followingId + " " + followerId);

    userModel
        .unfollow(followerId, followingId)
        .then(function (user) {
            res.json(user);
        })

}

function sendMessage(req, res) {
    var userId = req.params.userId;
    var message = req.body;
    var myId = req.user._id;

    console.log("sendMessage-user.service.server userId: " + userId +" myId: " + myId + "  message: " + message);

    userModel
        .sendMessage(myId, userId, message)
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

function uploadImage(req, res) {
    var myFile = req.file;
    var userId = req.body.userId;

    var filename = myFile.filename;

    userModel
        .uploadImage(userId,filename)
        .then(function (status) {
            var callbackUrl = "/#!/account";
            res.redirect(callbackUrl)
        });


}