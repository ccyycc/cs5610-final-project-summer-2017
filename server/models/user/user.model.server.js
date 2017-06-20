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
    return addToCollections(userId, fId, 'followers');
}

function deleteFollowing(userId, fId) {
    return deleteFromCollections(userId, fId, 'followings');
}

function addFollowing(userId, fId) {
    return addToCollections(userId, fId, 'followings');
}


////////////////////purely user part////////////////
function createUser(user) {
    if (!user.roles) {
        user.roles = ['USER'];
    } else if (user.roles.indexOf(',') > -1) {
        user.roles = user.roles.split(',');
    }
    user.photo = './uploads/default_profile.png';
    return userModel.create(user);
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

function findUserByCredentials(username) {
    return userModel
        .findOne({username: username})
        .then(function (user) {
            return user;
        })
}

function updateUser(userId, user) {
    delete user.username;
    if (!user.roles) {
        user.roles = ['USER'];
    } else if (user.roles.indexOf(',') > -1) {
        user.roles = user.roles.split(',');
    }

    return userModel.update({_id: userId}, {$set: user});
}

function deleteUser(userId) {
    var websiteModel = require('../website/website.models.server');

    return userModel
        .remove({_id: userId})
        .then(function (status) {
            return websiteModel
                .deleteWebsitesForUser(userId);
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