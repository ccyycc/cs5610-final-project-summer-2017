(function () {
    angular
        .module("FinalProject")
        .controller("recipeListByCreatorController", RecipeListByCreatorController);

    function RecipeListByCreatorController($routeParams, $location, recipeService, currentUser, userService) {

        var model = this;

        model.canEdit = canEdit;
        model.createRecipe = createRecipe;
        model.logout = logout;

        function init() {

            model.sectionTitle = 'Recipe List from ' + currentUser.username;
            model.creatorId = $routeParams.creatorId;

            if (currentUser._id) {
                model.ifLoggedIn = true;
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

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function canEdit() {
            return ((currentUser._id === model.creatorId) || (currentUser.role === 'ADMIN'));
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


