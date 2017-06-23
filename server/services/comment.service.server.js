var app = require('../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/uploads'});

var commentModel = require('../models/comment/comment.model.server');

app.post('/api/comment', createComment);
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

function createComment(req, res) {
    var comment = req.body;
    commentModel
        .createComment(comment)
        .then(function (comment) {
            res.json(comment);
        }, function () {
            res.sendStatus(500);
        })
}