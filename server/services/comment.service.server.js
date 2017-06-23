var app = require('../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/uploads'});

var commentModel = require('../models/comment/comment.model.server');


app.post('/api/from/:userId/to/:recipeId/comment', createRecipeReview);
app.get('/api/comment/recipe_review/:recipeId', findAllRecipeReview);

function findAllRecipeReview(req, res) {
    var recipeId = req.params.recipeId;
    commentModel
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
    commentModel
        .createRecipeReview(userId, recipeId, comment)
        .then(function (comment) {
            res.json(comment);
        }, function () {
            res.sendStatus(500);
        })
}