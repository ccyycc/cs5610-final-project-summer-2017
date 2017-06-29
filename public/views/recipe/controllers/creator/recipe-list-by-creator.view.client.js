(function () {
    angular
        .module("FinalProject")
        .controller("recipeListByCreatorController", RecipeListByCreatorController);

    function RecipeListByCreatorController($routeParams, $location, recipeService, currentUser, userService) {

        var model = this;

        //variable & route params
        model.createId = $routeParams['creatorId'];

        //event handler
        model.canEdit = canEdit;
        model.createRecipe = createRecipe;
        model.logout = logout;


        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            if (model.createId) {
                userService
                    .findUserById(model.createId)
                    .then(function (user) {
                        model.creator = user;
                        model.sectionTitle = 'Recipe List from ' + model.creator.username;
                        recipeService
                            .findAllRecipesForCreator(model.creator._id)
                            .then(function (recipes) {
                                model.recipes = recipes;
                            });
                    });
            } else {
                model.creator = currentUser;
                model.sectionTitle = 'Recipe List from ' + model.creator.username;
                recipeService
                    .findAllRecipesForCreator(model.creator._id)
                    .then(function (recipes) {
                        model.recipes = recipes;
                    })
            }
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
            return ((currentUser._id === model.creator._id) || (currentUser.role === 'ADMIN'));
        }

        function createRecipe() {
            var newRecipe = {
                name: "New Recipe"
            };
            recipeService
                .createRecipe(model.creator._id, newRecipe)
                .then(function (recipe) {
                    $location.url("/auth_recipe_list/" + recipe._id + '#NEW');
                }, function () {
                    model.error = "can't create new recipe at this time, please try again";
                })
        }
    }
})();


