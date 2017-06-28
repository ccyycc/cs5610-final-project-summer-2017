(function () {
    angular
        .module("FinalProject")
        .controller("recipeEditController", RecipeEditController);

    function RecipeEditController($routeParams, $location, recipeService, currentUser, userService) {

        var model = this;

        model.createSingleIngredient = createSingleIngredient;
        model.selectSingleIngredient = selectSingleIngredient;
        model.editSingleIngredient = editSingleIngredient;
        model.deleteSingleIngredient = deleteSingleIngredient;
        model.clearSingleIngredient = clearSingleIngredient;
        model.updateRecipe = updateRecipe;
        model.deleteRecipe = deleteRecipe;
        model.saveRecipe = saveRecipe;
        model.logout = logout;

        model.recipeId = $routeParams.recipeId;
        model.newIngredient = {};

        function init() {

            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            ifNewRecipe();

            recipeService
                .findRecipeById(model.recipeId)
                .then(function (recipe) {
                    model.recipe = recipe;
                    if (!canEdit()) {
                        // console.log(currentUser._id)
                        // console.log(model.recipe._creator)
                        $location.url('/');
                    }
                });

            recipeService
                .findAllRecipesForCreator(currentUser._id)
                .then(function (recipes) {
                    model.recipes = recipes;
                });
        }

        init();

        function canEdit() {

            return ((currentUser._id === model.recipe._creator._id) || (currentUser.role === 'ADMIN'));
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function ifNewRecipe() {
            if ($location.hash()) {
                model.ifNewRecipe = true;
                model.sectionTitle = "New Recipe";
            } else {
                model.ifNewRecipe = false;
                model.sectionTitle = "Edit Recipe";
            }
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
            model.newIngredient = {};
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

        function saveRecipe() {
            return recipeService
                .updateRecipe(model.recipeId, model.recipe)
        }

        function updateRecipe() {
            saveRecipe()
                .then(function () {
                    $location.url("/auth_recipe_list")
                }, function () {
                    model.error = "can't update at this time, please try later.";
                })
        }

        function deleteRecipe() {
            recipeService
                .deleteRecipe(model.recipeId)
                .then(function () {
                    $location.url("/auth_recipe_list");
                }, function () {
                    model.error = "can't delete at this time, please try later.";
                })
        }

    }
})();
