var app = require('../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/uploads/recipe'});

var recipeModel = require('../models/recipe/recipe.model.server');

app.post('/api/user/:userId/recipe', createRecipe);
app.get('/api/user/:userId/recipe', findAllRecipesForCreator);
app.get('/api/recipe/:recipeId', findRecipeById);
app.put('/api/recipe/:recipeId', updateRecipe);
app.delete('/api/recipe/:recipeId', deleteRecipe);
app.get('/api/recipe', findRecipeByCriteria);
app.post('/api/recipe/upload', upload.single('myFile'), uploadImage);
app.post('/api/yummly/recipeCopy', createYummlyLocalRecipeCopy);
app.get('/api/yummly/recipeCopy/:recipeId', findYummlyRecipeCopyByYummlyId);


function findYummlyRecipeCopyByYummlyId(req, res) {
    var recipeId = req.params.recipeId;
    recipeModel
        .findYummlyRecipeCopyByYummlyId(recipeId)
        .then(function (recipe) {
            res.json(recipe);
        }, function () {
            res.sendStatus(500);
        })
}

function createYummlyLocalRecipeCopy(req, res) {
    // var yummlyRecipeId = req.body.yummlyRecipeId;
    var recipe = req.body;
    recipeModel
        .createYummlyLocalRecipeCopy(recipe)
        .then(function (recipe) {
            res.json(recipe);
        }, function () {
            res.sendStatus(500);
        })
}

function createRecipe(req, res) {
    var userId = req.params.userId;
    var recipe = req.body;
    recipeModel
        .createRecipe(userId, recipe)
        .then(function (recipe) {
            res.json(recipe);
        }, function () {
            res.sendStatus(500);
        });
}

function findAllRecipesForCreator(req, res) {
    var userId = req.params.userId;
    recipeModel
        .findAllRecipesForCreator(userId)
        .then(function (recipes) {
            res.json(recipes);
        }, function () {
            res.sendStatus(500);
        });
}

function findRecipeById(req, res) {
    var recipeId = req.params.recipeId;
    recipeModel
        .findRecipeById(recipeId)
        .then(function (recipe) {
            res.json(recipe);
        }, function () {
            res.sendStatus(500);
        });
}

function updateRecipe(req, res) {
    var recipeId = req.params.recipeId;
    var recipe = req.body;
    recipeModel
        .updateRecipe(recipeId, recipe)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(500);
        });
}

function deleteRecipe(req, res) {
    var recipeId = req.params.recipeId;
    recipeModel
        .deleteRecipe(recipeId)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(500);
        });
}

function findRecipeByCriteria(req, res) {
    var criteria = req.query.searchTerm;
    recipeModel
        .findRecipeByCriteria(criteria)
        .then(function (recipes) {
            res.json(recipes);
        }, function () {
            res.sendStatus(500);
        });
}

function uploadImage(req, res) {

    var recipeId = req.body.recipeId;
    var myFile = req.file;
    var userId = req.body.userId;

    var callbackUrl = "/index.html#!/recipe/" + recipeId;

    if (!myFile) {
        res.redirect(callbackUrl);
    } else {

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        changeImageForRecipe(recipeId, filename);
        res.redirect(callbackUrl);
    }
}

function changeImageForRecipe(recipeId, filename) {
    recipeModel
        .findRecipeById(recipeId)
        .then(function (recipe) {
            recipe.image = '/uploads/recipe/' + filename;
            return recipeModel
                .updateRecipe(recipeId, recipe);
        });
}

