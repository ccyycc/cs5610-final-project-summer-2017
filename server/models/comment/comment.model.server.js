var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');
var commentModel = mongoose.model('commentModel', commentSchema);

commentModel.createMessage = createMessage;
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
    console.log('createComment comment.model comment: ' + comment);
    return commentModel
        .create(comment)
        .then(function (comment) {
            console.log('createComment success ' + comment);
            return comment;
        })
}

function createMessage(myId, userId, message) {
    var comment = {
        content: message,
        fromWhom: myId,
        toWhom: userId
    };
    console.log('createMessage comment.model message' + comment);
    return commentModel
        .createComment(comment)
        .then(function (message) {
            console.log('createMessage success comment.model');
            return message;
        })
}

function findCommentById(commentId) {
    return commentModel
        .findById(commentId)
        .then(function (comment) {
            return comment;
        })
}

function findAllComments() {
    return commentModel
        .find()
        .then(function (comments) {
            return comments;
        })
}
