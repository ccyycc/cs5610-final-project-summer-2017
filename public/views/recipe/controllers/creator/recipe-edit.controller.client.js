(function () {
    angular
        .module("FinalProject")
        .controller("recipeEditController", RecipeEditController);

    function RecipeEditController($routeParams, $location, currentUser, recipeService) {

        var model = this;

        model.creatorId = currentUser._id;
        model.recipeId = $routeParams.recipeId;

        model.tempIngredient = "";

        model.createSingleIngredient = createSingleIngredient;
        model.addSingleIngredient = addSingleIngredient;
        model.selectSingleIngredient = selectSingleIngredient;
        model.editSingleIngredient = editSingleIngredient;
        model.deleteSingleIngredient = deleteSingleIngredient;

        model.updateRecipe = updateRecipe;
        model.deleteRecipe = deleteRecipe;

        function init() {
            if (currentUser.roles.indexOf('RECIPEPRO') === -1) {
                $location.url('/account')
                //TODO: a trans page? Or directly go back to somewhere
            }
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

        function createSingleIngredient() {
            model.ifNewIngredient = true;
            model.newIngredient = {};
        }

        function addSingleIngredient() {
            // console.log(model.newIngredient.name);
            // console.log(ingredient);
            // console.log(name, description);
            // model.recipe.ingredients.push(model.tempIngredient);
            if (model.newIngredient.name) {
                // console.log(model.newIngredient.name);
                model.recipe.ingredients.push(model.newIngredient);
                model.error = "";
                model.ifNewIngredient = false;
                model.newIngredient = {};
            } else {
                model.error = "New ingredient name can't be empty.";
            }

            // model.recipe.ingredients.push({
            //     name: model.tempIngredient.name,
            //     description: model.tempIngredient.description
            // });
            // model.tempIngredient = "";
            // console.log(model.recipe.ingredients);
        }

        function selectSingleIngredient(ingredient) {
            model.editIngredient = ingredient;
            // model.tempIngredient.name = ingredient.name;
            // model.tempIngredient.description = ingredient.description;
            // model.tempIngredient = ingredient;
        }

        function editSingleIngredient() {
            // console.log(ingredient);
            model.editIngredient = {};
        }

        function deleteSingleIngredient(ingredient) {
            if (model.ifNewIngredient) {
                model.error = "";
                model.ifNewIngredient = false;
                model.newIngredient = {};
            } else {
                var index = model.recipe.ingredients.indexOf(ingredient);
                model.recipe.ingredients.splice(index, 1);
            }
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
                    $location.url("/user/" + model.creatorId + "/recipe/");
                })
        }

    }
})();
