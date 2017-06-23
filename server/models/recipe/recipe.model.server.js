var mongoose = require('mongoose');

var recipeSchema = require('./recipe.schema.server');
var recipeModel = mongoose.model('recipeModel', recipeSchema);
var userModel = require('../user/user.model.server');

recipeModel.createRecipe = createRecipe;
recipeModel.findAllRecipesForCreator = findAllRecipesForCreator;
recipeModel.findRecipeById = findRecipeById;
recipeModel.updateRecipe = updateRecipe;
recipeModel.deleteRecipe = deleteRecipe;
recipeModel.findRecipeByCriteria = findRecipeByCriteria;
recipeModel.createYummlyLocalRecipeCopy = createYummlyLocalRecipeCopy;
// recipeModel.findRecipeByName = findRecipeByName;
// recipeModel.findRecipeByIngredient = findRecipeByIngredient;

module.exports = recipeModel;

function createYummlyLocalRecipeCopy(yummlyRecipeId, recipe) {
    recipe.source = 'YUMMLY';
    recipe.yummlyId = yummlyRecipeId;

    return recipeModel
        .create(recipe)
        .then(function (recipe) {
            console.log(recipe);
            return recipe;
        })
}

function createRecipe(userId, recipe) {
    recipe._creator = userId;

    return recipeModel
        .create(recipe)
        .then(function (recipe) {
            return recipe;
            //TODO: add back
            // return userModel
            //     .addRecipe(recipe._id, userId)
            //     .then(function () {
            //         return recipe;
            //     });
        });
}

function findAllRecipesForCreator(userId) {
    return recipeModel
        .find({_creator: userId});
}

function findRecipeById(recipeId) {
    return recipeModel
        .findById(recipeId);
}

function updateRecipe(recipeId, recipe) {
    recipe.dateModified = Date.now();
    return recipeModel
        .update({_id: recipeId}, {$set: recipe});
}

function deleteRecipe(recipeId) {
    return recipeModel
        .findByIdAndRemove(recipeId)
        .then(function (recipe) {
            //TODO:need this!
            // return userModel
            //     .deleteRecipe(recipeId, recipe._creator);
        })
}

function findRecipeByCriteria(searchTerm) {
    // console.log(searchTerm);
    return recipeModel
        // .find({ingredients: {$in: [new RegExp(searchTerm, "i")]}});
        .find({$or: [{name: new RegExp(searchTerm, "i")}, {ingredients: new RegExp(searchTerm, "i")}]});
        // .then(function (recipes) {
        //     console.log(recipes);
        // })
    // {ingredients: new RegExp(searchTerm, "i")}
}
