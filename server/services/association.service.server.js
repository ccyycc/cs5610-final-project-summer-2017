var app = require('../../express');

var associationModel = require('../models/association/association.model.server');

// app.post('/api/association/like', createLike);
// app.post('/api/association/comment', createComment);
// app.get('/api/association/comment/recipe/:recipeId', findAllRecipeReview);
// app.delete('/api/association/like/:likeId', deleteRecipeLike);
// app.get('/api/association/like/from/:userId/to/:recipeId', findLikeForRecipe);

//TODO TYPE TO UPPER CASE
app.post('/api/association', createAssociation);
app.put('/api/association/:id', updateAssociation);
app.delete('/api/association/:id', deleteAssociation);

app.get('/api/association/find/id/:id', findAssociationById);
app.get('/api/association/find/type/:type', findAllAssociationByType);
app.get('/api/association/find/type/:type/from/:sourceId', findAssociationForSource);
app.get('/api/association/find/type/:type/to/:targetType/:targetId', findAssociationForTarget);
app.get('/api/association/find/type/:type/from/:sourceId/to/:targetType/:targetId', findAssociationForSourceTarget);



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
    var associationId= req.params["id"]();

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

