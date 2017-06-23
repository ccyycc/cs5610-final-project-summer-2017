var mongoose = require('mongoose');
var associationSchema = require('./association.schema.server');
var associationModel = mongoose.model('associationModel', associationSchema);

associationModel.createRecipeReview = createRecipeReview;
associationModel.deleteComment = deleteComment;
associationModel.findCommentById = findCommentById;
associationModel.findAllComments = findAllComments;
associationModel.findAllRecipeReview = findAllRecipeReview;

module.exports = associationModel;

function findAllRecipeReview(recipeId) {
    return associationModel
        .find({toRecipe: recipeId});
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

function createRecipeReview(userId, recipeId, comment) {
    comment.fromWhom = userId;
    comment.toRecipe = recipeId;
    console.log(comment);
    return associationModel
        .create(comment)
        .then(function (comment) {
            return comment;
        })

}

function findCommentById(commentId) {
    return associationModel.findById(commentId);
}

function findAllComments() {
    return associationModel.find();
}
