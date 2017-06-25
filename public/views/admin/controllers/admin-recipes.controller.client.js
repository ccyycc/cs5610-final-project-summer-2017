(function () {
    angular
        .module('FinalProject')
        .controller('adminRecipesController', adminRecipesController);

    function adminRecipesController(recipeService) {
        var model = this;

        model.deleteRecipe = deleteRecipe;
        model.createRecipe = createRecipe;
        model.selectRecipe = selectRecipe;
        model.updateRecipe = updateRecipe;
        // model.currentRecipe = currentRecipe;

        function init() {
            console.log('admin-recipe.controller');

            findAllRecipes();
        }

        init();

        function updateRecipe(recipe) {
            // console.log(recipe);
            model.message = false;
            recipeService
                .updateRecipe(recipe._id, recipe)
                .then(findAllRecipes());
            model.recipe = {};
        }

        function selectRecipe(recipe) {
            model.recipe = angular.copy(recipe);
        }

        function createRecipe(recipe) {
            recipeService
                .createRecipe(recipe)
                .then(function () {
                    model.message = "The default password is 'password'";
                })
                .then(findAllRecipes());
        }
        function deleteRecipe(recipe) {
            model.message = false;
            recipeService
                .deleteRecipe(recipe._id)
                .then(findAllRecipes());
        }

        function findAllRecipes() {
            recipeService
                .findAllRecipes()
                .then(function (recipes) {
                    model.recipes = recipes;
                })
        }


    }

})();