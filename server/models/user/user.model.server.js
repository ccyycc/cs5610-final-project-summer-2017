var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel', userSchema);

userModel.createUser = createUser;
userModel.deleteUser = deleteUser;

userModel.updateUser = updateUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findAllUsers = findAllUsers;
userModel.findUserByPartialUsername = findUserByPartialUsername;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.uploadImage = uploadImage;

userModel.addFollower = addFollower;
userModel.deleteFollower = deleteFollower;
userModel.addFollowing = addFollowing;
userModel.deleteFollowing = deleteFollowing;

userModel.addLikedRecipe = addLikedRecipe;
userModel.deleteLikedRecipe = deleteLikedRecipe;
userModel.addCollect = addCollect;
userModel.deleteCollect = deleteCollect;

userModel.addToCollections = addToCollections;
userModel.deleteFromCollections = deleteFromCollections;

userModel.follow = follow;
userModel.unfollow = unfollow;
userModel.addMessage = addMessage;
userModel.deleteMessage = deleteMessage;
userModel.sendMessage = sendMessage;

userModel.populateArr = populateArr;
userModel.addbmr = addbmr;


module.exports = userModel;


function deleteFromCollections(userId, itemId, collectionName) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.get(collectionName).indexOf(itemId);
            user.get(collectionName).splice(index, 1);
            return user.save();
        })
        .catch(function (status) {
            console.log(status);
        })
}

function addToCollections(userId, itemId, collectionName) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.get(collectionName).push(itemId);
            return user.save();
        })
}

function deleteLikedRecipe(userId, rId) {
    return deleteFromCollections(userId, rId, 'likedRecipes');
}

function addLikedRecipe(userId, rId) {
    return addToCollections(userId, rId, 'likedRecipes');
}

function addCollect(userId, cId) {
    return addToCollections(userId, cId, 'productsCollection')
}

function deleteCollect(userId, cId) {
    return deleteFromCollections(userId, cId, 'productsCollection');
}

function deleteFollower(userId, fId) {
    return deleteFromCollections(userId, fId, 'followers');
}

function addFollower(userId, fId) {
    return addToCollections(userId, fId, 'followers')
        .then(function (status) {
            console.log(userId + " followed by " + fId + " success");

        })
        .catch(function (err) {
            console.log('addFollower Error: ' + err);
        })
}

function deleteFollowing(userId, fId) {
    return deleteFromCollections(userId, fId, 'followings');
}

function addFollowing(userId, fId) {
    return addToCollections(userId, fId, 'followings')
        .then(function (status) {
            console.log(userId + " follow " + fId + " success");
        })
        .catch(function (err) {
            console.log('addFollowing Error: ' + err);
        })
}

function addMessage(userId, messageId) {
    return addToCollections(userId, messageId, 'messages');
}

function deleteMessage(userId, messageId) {
    return deleteFromCollections(userId, messageId, 'messages');
}

function follow(myId, followingId) {
    return userModel
        .addFollowing(myId, followingId)
        .then(function (user) {
            return userModel.addFollower(followingId, myId);
        })
}

function unfollow(followerId, followingId) {
    return userModel
        .deleteFollowing(followerId, followingId)
        .then(function (user) {
            return userModel.deleteFollower(followingId, followerId);
        })
}

function sendMessage(myId, userId, message) {
    var associationModel = require('../association/association.model.server');

    return associationModel
        .createMessage(myId, userId, message)
        .then(function (message) {
            return userModel
                .addMessage(userId, message._id)
                .then(function (user) {
                    return user;
                })
        })
}

function populateArr(userId, arrName) {
    return userModel
        .findById(userId)
        .populate(arrName)
        .exec()
}

////////////////////purely user part////////////////
function createUser(user) {
    if (!user.role) {
        user.role = 'USER';
    }
    user.photo = './uploads/default_profile.png';

    console.log('createUser user.model.server ' + user);
    return userModel
        .create(user)
        .then(function (user) {
            console.log('createUser success -- user.model.server ' + user);
            return user;
        })
        .catch(function (status) {
            console.log('createUser not success --user.model ' + status);
        })
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function findUserByFacebookId(facebookId) {
    return User.findOne({'facebook.id': facebookId});
}


function findUserByUsername(username) {
    return userModel.findOne({username: username});
}
function findUserByPartialUsername(username){
    return userModel
        .find({username: new RegExp(username, "i")})
}

function findUserByCredentials(username) {
    return userModel
        .findOne({username: username})
        .then(function (user) {
            return user;
        })
}

function addbmr(userId, bmr) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.bmr = bmr;
            return user.save();
        })
}

function updateUser(userId, user) {
    delete user.username;
    if (!user.role) {
        user.role = ['USER'];
    }

    return userModel.update({_id: userId}, {$set: user});
}

function deleteUser(userId) {

    return userModel
        .remove({_id: userId})
        .then(function (status) {
            return status;
        })
}

function uploadImage(userId, filename) {

    return userModel
        .findById(userId)
        .then(function (user) {
            user.photo = '/uploads/' + filename;
            return user.save();
        })
}