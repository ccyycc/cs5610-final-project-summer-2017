(function () {
    angular
        .module("FinalProject")
        .controller("recipeEditController", RecipeEditController);

    function RecipeEditController($routeParams, $location, currentUser, recipeService) {

        var model = this;

        model.creatorId = currentUser._id;
        model.recipeId = $routeParams.recipeId;

        model.sectionTitle = "Edit Recipe";

        model.createSingleIngredient = createSingleIngredient;
        model.selectSingleIngredient = selectSingleIngredient;
        model.editSingleIngredient = editSingleIngredient;
        model.deleteSingleIngredient = deleteSingleIngredient;
        model.clearSingleIngredient = clearSingleIngredient;
        model.updateRecipe = updateRecipe;
        model.deleteRecipe = deleteRecipe;

        function init() {
            if (currentUser.role === 'RECIPEPRO') {
                $location.url('/account')
                //TODO: a trans page? Or directly go back to somewhere
            }
            model.newIngredient = {};
            ifNewRecipe();
            recipeService
                .findAllRecipesForCreator(model.creatorId)
                .then(function (recipes) {
                    model.recipes = recipes;
                });
            //TODO: is it possible to have a list of recipe of one person and the editing recipe of another?
            recipeService
                .findRecipeById(model.recipeId)
                .then(function (recipe) {
                    model.recipe = recipe;
                })
        }

        init();

        function ifNewRecipe() {
            return $location.hash()? model.ifNewRecipe = true:model.ifNewRecipe = false;
        }

        function createSingleIngredient() {
            if (model.newIngredient.name) {
                model.recipe.ingredients.push(model.newIngredient);
                model.error = "";
                model.newIngredient = {};
            } else {
                model.error = "New ingredient name can't be empty.";
            }
        }

        function clearSingleIngredient() {
            model.error = "";
            model.newIngredient={};
        }

        function selectSingleIngredient(ingredient) {
            model.editIngredient = ingredient;
        }

        function editSingleIngredient(ingredient) {
            if (ingredient.name) {
                model.editIngredient = {};
                model.error = "";
            } else {
                model.error = "Ingredient name can't be empty.";
            }
        }

        function deleteSingleIngredient(ingredient) {
            var index = model.recipe.ingredients.indexOf(ingredient);
            model.recipe.ingredients.splice(index, 1);
            model.error = "";
        }

        function updateRecipe() {
            recipeService
                .updateRecipe(model.recipeId, model.recipe)
                .then(function () {
                    model.message = "Update successful!";
                }, function () {
                    model.error = "can't update at this time, please try later.";
                })
        }

        function deleteRecipe() {
            recipeService
                .deleteRecipe(model.recipeId)
                .then(function () {
                    $location.url("/creator/" + model.creatorId + "/recipe/");
                }, function () {
                    model.error = "can't delete at this time, please try later.";
                })
        }

    }
})();
