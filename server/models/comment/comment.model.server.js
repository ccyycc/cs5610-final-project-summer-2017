var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');
var commentModel = mongoose.model('commentModel', commentSchema);


commentModel.createComment = createComment;
commentModel.findAllCommentsForSeller = findAllCommentsForSeller;
commentModel.findCommentById = findCommentById;
commentModel.updateComment = updateComment;
commentModel.deleteComment = deleteComment;


module.exports = commentModel;


function createComment(user, comment) {
    comment._user = user;
    comment.dateCreated = Date.now();
    comment.dateUpdated = Date.now();   
    return commentModel
        .create(comment)
        .then(function (comment) {
            return comment;
        })
}


function findAllCommentsForSeller(user) {
    return commentModel
        .find({_user: user})
        .exec();
}

function findCommentById(commentId) {
    return commentModel.findById(commentId);
}


function updateComment(commentId, comment) {
    comment.dateUpdated = Date.now();
    return commentModel.update({_id: commentId}, {$set: comment});
}

function deleteComment(commentId) {
    return commentModel.remove({_id:commentId}).exec();
}



