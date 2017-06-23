(function () {
    angular
        .module("FinalProject")
        .controller("recipeListByCreatorController", RecipeListByCreatorController);

    function RecipeListByCreatorController($routeParams, $location, recipeService) {

        var model = this;

        model.creatorId = $routeParams.userId;
        model.goToDetail = goToDetail;
        model.createRecipe = createRecipe;
        // userId = currentUser._id;

        function init() {

            recipeService
                .findAllRecipesForCreator(model.creatorId)
                .then(function (recipes) {
                    model.recipes = recipes;
                })

            // recipeService
            //     .findAllRecipesForCreator(userId)
            //     .then(function (recipes) {
            //         model.recipes = recipes;
            //     })
        }

        init();

        function createRecipe() {
            var newRecipe = {
                name : "New Recipe"
            };
            recipeService
                .createRecipe(model.creatorId, newRecipe)
                .then(function (recipe) {
                    $location.url("/recipe/" + recipe._id);
                }, function () {
                    model.error = "can't create new recipe at this time, please try again";
                })

        }

        function goToDetail(recipe, recipeId) {
            $location.url("/recipe/" + recipeId);
        }
    }
})();


