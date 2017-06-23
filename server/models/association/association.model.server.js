var mongoose = require('mongoose');
var associationSchema = require('./association.schema.server');
var associationModel = mongoose.model('associationModel', associationSchema);

associationModel.createAssociation = createAssociation;
associationModel.findAllRecipeReview = findAllRecipeReview;
associationModel.deleteComment = deleteComment;
associationModel.findCommentById = findCommentById;
associationModel.findAllComments = findAllComments;
associationModel.deleteRecipeLike = deleteRecipeLike;

module.exports = associationModel;

function deleteRecipeLike(userId, recipeId) {
    return associationModel
        .findOneAndRemove({$and: [{fromWhom: userId}, {toRecipe: recipeId}]});
}

function findAllRecipeReview(recipeId) {
    return associationModel
        .find({toRecipe: recipeId});
}

function createAssociation(comment) {
    return associationModel
        .create(comment)
        .then(function (comment) {
            return comment;
        })
}

function deleteComment(commentId) {
    return associationModel
        .remove(commentId)
        .then(function (status) {
            return status;
        })
        .catch(function (status) {
            console.log(status);
        })
}


function findCommentById(commentId) {
    return associationModel.findById(commentId);
}

function findAllComments() {
    return associationModel.find();
}
