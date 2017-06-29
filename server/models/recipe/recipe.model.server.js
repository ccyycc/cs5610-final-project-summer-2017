var mongoose = require('mongoose');

var recipeSchema = require('./recipe.schema.server');
var recipeModel = mongoose.model('recipeModel', recipeSchema);


recipeModel.createRecipe = createRecipe;
recipeModel.createYummlyLocalRecipeCopy = createYummlyLocalRecipeCopy;
recipeModel.updateRecipe = updateRecipe;
recipeModel.deleteRecipe = deleteRecipe;

recipeModel.findRecipeById = findRecipeById;
recipeModel.findAllRecipesForCreator = findAllRecipesForCreator;
recipeModel.findRecipeByCriteria = findRecipeByCriteria;
recipeModel.findYummlyRecipeCopyByYummlyId = findYummlyRecipeCopyByYummlyId;
recipeModel.findAllRecipes = findAllRecipes;

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

function createRecipe(userId, recipe) {
    recipe._creator = userId;

    return recipeModel
        .create(recipe)
        .then(function (recipe) {
            // console.log(recipe);
            return recipe;
        });
}

function findAllRecipesForCreator(userId) {
    return recipeModel
        .find({_creator: userId});
}

function findRecipeById(recipeId) {
    return recipeModel
        .findById(recipeId)
        .populate('_creator')
        .exec();
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
        .find({
            $and: [{source: 'LOCAL'},
                {$or: [{name: new RegExp(searchTerm, "i")}, {ingredients: new RegExp(searchTerm, "i")}]}]
        });
}

function findAllRecipes() {
    return recipeModel
        .find()
        .populate('_creator')
        .exec();
}
