var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');
var commentModel = mongoose.model('commentModel', commentSchema);

commentModel.createComment = createComment;
commentModel.deleteComment = deleteComment;
commentModel.findCommentById = findCommentById;
commentModel.findAllComments = findAllComments;

module.exports = commentModel;



function deleteComment(commentId) {
    return commentModel
        .remove(commentId)
        .then(function (status) {
            return status;
        })
        .catch(function (status) {
            console.log(status);
        })
}

function createComment(comment) {
    return commentModel
        .create(comment);
}

function findCommentById(commentId) {
    return commentModel.findById(commentId);
}

function findAllComments() {
    return commentModel.find();
}
