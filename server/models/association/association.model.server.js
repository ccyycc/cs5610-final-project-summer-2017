var mongoose = require('mongoose');
var associationSchema = require('./association.schema.server');
var associationModel = mongoose.model('associationModel', associationSchema);

associationModel.createAssociation = createAssociation;
associationModel.findAllRecipeReview = findAllRecipeReview;
associationModel.deleteRecipeLike = deleteRecipeLike;
associationModel.findLikeForRecipe = findLikeForRecipe;
associationModel.deleteComment = deleteComment;
associationModel.findCommentById = findCommentById;
associationModel.findAllComments = findAllComments;
associationModel.renderMessage = renderMessage;

associationModel.createMessage = createMessage;

module.exports = associationModel;

function findLikeForRecipe(userId, recipeId) {
    return associationModel
        .findOne({$and: [{fromWhom: userId}, {toRecipe: recipeId}]});
}

function deleteRecipeLike(likeId) {
    return associationModel
        .findByIdAndRemove(likeId);
}

function findAllRecipeReview(recipeId) {
    return associationModel
        .find({toRecipe: recipeId});
}

function createAssociation(comment) {
    //TODO:check role and association type
    return associationModel
        .create(comment)
        .then(function (comment) {
            return comment;
        })
}

function deleteComment(userId,commentId) {
    var userModel = require('../user/user.model.server');
    return userModel
        .deleteMessage(userId, commentId)
        .then(function () {
            associationModel
                .findByIdAndRemove(commentId)
                .then(function (status) {
                    // console.log('comment delete success -- ass model');
                    return status;
                })
                .catch(function (status) {
                    console.log(status);
                })
        })
}


function findCommentById(commentId) {
    return associationModel.findById(commentId);
}

function findAllComments() {
    return associationModel.find();
}

function createMessage(myId, userId, message) {
    var comment = {
        content: message,
        fromWhom: myId,
        toWhom: userId,
        type:'COMMENT'
    };
    return associationModel
        .createAssociation(comment)
        .then(function (message) {
            return message;
        })
}

function renderMessage(userId) {
    return associationModel
        .find({toWhom: userId})
        .populate('fromWhom')
        .exec()
        .then(function (messages) {
            return messages;
        })
}


