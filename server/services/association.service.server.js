var app = require('../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/uploads'});

var associationModel = require('../models/association/association.model.server');


app.post('/api/from/:userId/to/:recipeId/association', createRecipeReview);
app.get('/api/association/recipe_review/:recipeId', findAllRecipeReview);

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

function createRecipeReview(req, res) {
    var userId = req.params.userId;
    var recipeId = req.params.recipeId;
    var comment = req.body;
    associationModel
        .createRecipeReview(userId, recipeId, comment)
        .then(function (comment) {
            res.json(comment);
        }, function () {
            res.sendStatus(500);
        })
}