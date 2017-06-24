var mongoose = require('mongoose');

var recipeSchema = require('./recipe.schema.server');
var recipeModel = mongoose.model('recipeModel', recipeSchema);


recipeModel.createRecipe = createRecipe;
recipeModel.findAllRecipesForCreator = findAllRecipesForCreator;
recipeModel.findRecipeById = findRecipeById;
recipeModel.updateRecipe = updateRecipe;
recipeModel.deleteRecipe = deleteRecipe;
recipeModel.findRecipeByCriteria = findRecipeByCriteria;
recipeModel.createYummlyLocalRecipeCopy = createYummlyLocalRecipeCopy;
recipeModel.findYummlyRecipeCopyByYummlyId = findYummlyRecipeCopyByYummlyId;
// recipeModel.findRecipeByName = findRecipeByName;
// recipeModel.findRecipeByIngredient = findRecipeByIngredient;

module.exports = recipeModel;

function createYummlyLocalRecipeCopy(recipe) {
    return recipeModel
        .create(recipe)
        .then(function (recipe) {
            return recipe;
        })
}

function findYummlyRecipeCopyByYummlyId(recipeId) {
    return recipeModel
        .findOne({yummlyId: recipeId});
}


//TODO: DELETE YUMMLY RECIPE COPY
//TODO: FIND ALL RECIPE FOR ADMIN

function createRecipe(userId, recipe) {
    recipe._creator = userId;
    return recipeModel
        .create(recipe)
        .then(function (recipe) {
            console.log(recipe);
            return recipe;
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
        .findByIdAndRemove(recipeId);
}

function findRecipeByCriteria(searchTerm) {
    return recipeModel
        // .find({ingredients: {$in: [new RegExp(searchTerm, "i")]}});
        .find({$and: [{source: 'LOCAL'},
            {$or: [{name: new RegExp(searchTerm, "i")}, {ingredients: new RegExp(searchTerm, "i")}]}]});
        // .then(function (recipes) {
        //     console.log(recipes);
        // })
    // {ingredients: new RegExp(searchTerm, "i")}
}
