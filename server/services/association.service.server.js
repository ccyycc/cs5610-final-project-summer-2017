var app = require('../../express');

var associationModel = require('../models/association/association.model.server');

app.post('/api/association/like', createLike);
app.post('/api/association/comment', createComment);
app.get('/api/association/comment/recipe/:recipeId', findAllRecipeReview);
app.delete('/api/association/like/:likeId', deleteRecipeLike);
app.delete('/api/association/comment/:commentId', deleteComment);
app.get('/api/association/like/from/:userId/to/:recipeId', findLikeForRecipe);

//TODO TYPE TO UPPER CASE
app.post('/api/association', createAssociation);
app.put('/api/association/:id', updateAssociation);
app.delete('/api/association/:id', deleteAssociation);

app.get('/api/association/find/id/:id', findAssociationById);
app.get('/api/association/find/type/:type', findAllAssociationByType);
app.get('/api/association/find/type/:type/from/:sourceId', findAssociationForSource);
app.get('/api/association/find/type/:type/to/:targetType/:targetId', findAssociationForTarget);
app.get('/api/association/find/type/:type/from/:sourceId/to/:targetType/:targetId', findAssociationForSourceTarget);
app.get('/api/association/find/comments', isAdmin, findAllComments);


function createAssociation(req, res) {
    var association = req.body;

    associationModel
        .createAssociation(association)
        .then(function (association) {
            res.json(association);
        }, function () {
            res.sendStatus(500);
        })
}
function updateAssociation(req, res) {
    var association = req.body;
    var associationId= req.params.id;

    associationModel
        .updateAssociation(associationId,association)
        .then(function (association) {
            res.json(association);
        }, function () {
            res.sendStatus(500);
        })
}


function findAssociationById(req,res){
    var associationId= req.params["id"]();

    associationModel
        .findAssociationById(associationId)
        .then(function (association) {
            res.json(association);
        }, function () {
            res.sendStatus(500);
        })
}


function findAllAssociationByType(req,res) {
    var associationType = req.params['type'].toUpperCase();
    associationModel
        .findAllAssociationByType(associationType)
        .then(function (association) {
            res.json(association);
        }, function () {
            res.sendStatus(500);
        })
}

function findAssociationForSource(req,res){
    var associationType = req.params['type'].toUpperCase();
    var sourceId = req.params['sourceId'];
    associationModel
        .findAssociationForSource(associationType,sourceId)
        .then(function (association) {
            res.json(association);
        }, function () {
            res.sendStatus(500);
        })
}

function findAssociationForTarget(req,res){
    var associationType = req.params['type'].toUpperCase();
    var targetId = req.params['targetId'];
    var targetType = req.params['targetType'];
    associationModel
        .findAssociationForTarget(associationType,targetType,targetId)
        .then(function (association) {
            res.json(association);
        }, function () {
            res.sendStatus(500);
        })
}

function findAssociationForSourceTarget(req,res){
    var associationType = req.params['type'].toUpperCase();
    var sourceId = req.params['sourceId'];
    var targetId = req.params['targetId'];
    var targetType = req.params['targetType'];

    associationModel
        .findAssociationForSourceTarget(associationType,sourceId,targetType,targetId)
        .then(function (association) {
            res.json(association);
        }, function () {
            res.sendStatus(500);
        })
}


function deleteAssociation(req, res) {
    var associationId = req.params['id'];
    associationModel
        .deleteAssociationById(associationId)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(500);
        })
}

function deleteComment(req, res) {
    var commentId = req.params.commentId;
    associationModel
        .deleteComment(req.user._id, commentId)
        .then(function () {
            res.sendStatus(200);
        })
}

function findLikeForRecipe(req, res) {
    var userId = req.params.userId;
    var recipeId = req.params.recipeId;
    associationModel
        .findLikeForRecipe(userId, recipeId)
        .then(function (like) {
            res.json(like)
        }, function () {
            res.sendStatus(500);
        })
}

function deleteRecipeLike(req, res) {
    var likeId = req.params.likeId;
    associationModel
        .deleteRecipeLike(likeId)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(500);
        })
}

function findAllRecipeReview(req, res) {
    var recipeId = req.params.recipeId;
    associationModel
        .findAllRecipeReview(recipeId)
        .then(function (reviews) {
            res.json(reviews);
        }, function () {
            res.sendStatus(500);
        })
}

function findAllComments(req, res) {
    associationModel
        .findAllComments()
        .then(function (comments) {
            res.json(comments);
        })
        .catch(function (error) {
            console.log('error at association.service.server--' + error);
        })
}

function createComment(req, res) {
    var comment = req.body;
    associationModel
        .createAssociation(comment)
        .then(function (comment) {
            res.json(comment);
        }, function () {
            res.sendStatus(500);
        })
}

function createLike(req, res) {
    var like = req.body;
    associationModel
        .createAssociation(like)
        .then(function (like) {
            res.json(like);
        }, function () {
            res.sendStatus(500);
        })
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'ADMIN') {
        next();
    } else {
        res.sendStatus(401);
    }
}