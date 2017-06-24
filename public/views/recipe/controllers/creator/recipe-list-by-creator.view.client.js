(function () {
    angular
        .module("FinalProject")
        .controller("recipeListByCreatorController", RecipeListByCreatorController);

    function RecipeListByCreatorController($routeParams, $location, currentUser,recipeService) {

        var model = this;

        model.sectionTitle = 'Recipe List from ' + currentUser.username;
        model.currentUserId = currentUser._id;
        model.creatorId = $routeParams.creatorId;
        model.ifCreator = ifCreator;
        model.createRecipe = createRecipe;

        function init() {

            // if (currentUser.roles.indexOf('RECIPEPRO') === -1) {
            //
            //     // $location.url('/account')
            // }
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

        function ifCreator() {
            return model.currentUserId === model.creatorId;
        }

        function createRecipe() {
            var newRecipe = {
                name : "New Recipe"
            };
            recipeService
                .createRecipe(model.creatorId, newRecipe)
                .then(function (recipe) {
                    $location.url("/creator/" + model.creatorId + "/recipe/" + recipe._id + '#NEW');
                }, function () {
                    model.error = "can't create new recipe at this time, please try again";
                })
        }

    }
})();


