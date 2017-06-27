var mongoose = require('mongoose');
var associationSchema = require('./association.schema.server');
var associationModel = mongoose.model('associationModel', associationSchema);

associationModel.findAllRecipeReview = findAllRecipeReview;
associationModel.deleteRecipeLike = deleteRecipeLike;
associationModel.findLikeForRecipe = findLikeForRecipe;
associationModel.deleteComment = deleteComment;
associationModel.findCommentById = findCommentById;
associationModel.findAllComments = findAllComments;
associationModel.renderMessage = renderMessage;

associationModel.createMessage = createMessage;


associationModel.createAssociation = createAssociation;

associationModel.updateAssociation = updateAssociation;

associationModel.findAssociationById = findAssociationById;
associationModel.findAllAssociationByType = findAllAssociationByType;
associationModel.findAssociationForSource = findAssociationForSource;
associationModel.findAssociationForTarget = findAssociationForTarget;
associationModel.findAssociationForSourceTarget = findAssociationForSourceTarget;

associationModel.deleteAssociationById = deleteAssociationById;


module.exports = associationModel;


function createAssociation(association) {
    //TODO:check role and association type
    return associationModel
        .create(association)
        .then(function (association) {
            return association;
        })
}

function updateAssociation(associationId, association) {
    return associationModel.update({"_id": associationId}, {$set: association});
}

function findAssociationById(associationId) {
    return associationModel
        .findById(associationId)
}
function findAllAssociationByType(associationType) {
    return associationModel
        .find({"type": associationType});
}
function findAssociationForSource(associationType, sourceId) {
    return associationModel
        .find({
            $and: [
                {"type": associationType},
                {"fromWhom": sourceId}
            ]
        })
        .populate('fromWhom', 'username')
        .exec();
}

function findAssociationForTarget(associationType, targetType, targetId) {
    switch (targetType) {
        case "user":
            return associationModel
                .find(
                    {
                        $and: [
                            {"type": associationType},
                            {"toWhom": targetId}
                        ]
                    })
                .populate('fromWhom', 'username')
                .exec();
            break;
        case "recipe":
            return associationModel
                .find(
                    {
                        $and: [
                            {"type": associationType},
                            {"toRecipe": targetId}
                        ]
                    })
                .populate('fromWhom', 'username')
                .exec();
            break;
        case "store":
            return associationModel
                .find(
                    {
                        $and: [
                            {"type": associationType},
                            {"toStore": targetId}
                        ]
                    })
                .populate('fromWhom', 'username')
                .exec();
            break;
            break;
        case "merchandise":
            return associationModel
                .find(
                    {
                        $and: [
                            {"type": associationType},
                            {"toMerchandise": targetId}
                        ]
                    })
                .populate('fromWhom', 'username');
            break;
        default: {
            return [];
        }
    }
}

function findAssociationForSourceTarget(associationType, sourceId, targetType, targetId) {
    switch (targetType) {
        case "user":
            return associationModel
                .find(
                    {
                        $and: [
                            {"type": associationType},
                            {"fromWhom": sourceId},
                            {"toWhom": targetId}
                        ]
                    });
            break;
        case "recipe":
            return associationModel
                .find(
                    {
                        $and: [
                            {"type": associationType},
                            {"fromWhom": sourceId},
                            {"toRecipe": targetId}
                        ]
                    });
            break;
        case "store":
            return associationModel
                .find(
                    {
                        $and: [
                            {"type": associationType},
                            {"fromWhom": sourceId},
                            {"toStore": targetId}
                        ]
                    });
            break;
            break;
        case "merchandise":
            return associationModel
                .find(
                    {
                        $and: [
                            {"type": associationType},
                            {"fromWhom": sourceId},
                            {"toMerchandise": targetId}
                        ]
                    });
            break;
        default: {
            return [];
        }
    }


}

function deleteAssociationById(associationId) {
    return associationModel
        .findByIdAndRemove(associationId);
}


// TODO MAY NEED TO MODIFIED

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
        .find({toRecipe: recipeId})
        .populate('fromWhom')
        .exec();
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

function renderMessage(userId, dir) {
    if ( dir ==='in') {
        return associationModel
            .find({toWhom: userId})
            .populate('fromWhom')
            .exec()
            .then(function (messages) {
                return messages;
            })
    } else if (dir === 'out') {
        return associationModel
            .find({fromWhom: userId})
            .populate('toWhom')
            .exec()
            .then(function (messages) {
                return messages;
            })
    }
}


