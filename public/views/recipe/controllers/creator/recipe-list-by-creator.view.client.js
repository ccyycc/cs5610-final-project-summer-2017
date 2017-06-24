(function () {
    angular
        .module("FinalProject")
        .controller("recipeListByCreatorController", RecipeListByCreatorController);

    function RecipeListByCreatorController($routeParams, $location, currentUser,recipeService) {

        var model = this;

        model.creatorId = currentUser._id;
        model.goToDetail = goToDetail;
        model.createRecipe = createRecipe;

        function init() {

            if (currentUser.roles.indexOf('RECIPEPRO') === -1) {
                $location.url('/account')
                //TODO: a trans page? Or directly go back to somewhere
            }
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
                    $location.url("/recipe/" + recipe._id + '#NEW');
                }, function () {
                    model.error = "can't create new recipe at this time, please try again";
                })
        }

        function goToDetail(recipe, recipeId) {
            $location.url("/recipe/" + recipeId);
        }
    }
})();


