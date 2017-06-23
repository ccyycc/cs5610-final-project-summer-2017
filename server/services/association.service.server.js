var app = require('../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/uploads'});

var associationModel = require('../models/association/association.model.server');

app.post('/api/association/like', createLike);
app.post('/api/association/comment', createComment);
app.get('/api/association/comment/recipe/:recipeId', findAllRecipeReview);
app.delete('/api/association/like/from/:userId/to/:recipeId', deleteRecipeLike);

function deleteRecipeLike(req, res) {
    var userId = req.params.userId;
    var recipeId = req.params.recipeId;
    associationModel
        .deleteRecipeLike(userId, recipeId)
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