(function () {
    angular
        .module('FinalProject')
        .controller('adminRecipesController', adminRecipesController);

    function adminRecipesController($location,userService, recipeService,currentUser) {
        var model = this;

        //event handler
        model.deleteRecipe = deleteRecipe;
        model.createRecipe = createRecipe;
        model.selectRecipe = selectRecipe;
        model.updateRecipe = updateRecipe;
        model.logout = logout;

        //variable & route params
        model.sectionTitle = "Manage Recipes";

        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
            findAllRecipes();
        }



        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function updateRecipe(username, recipe) {
            model.message = false;
            model.error = false;

            if (username === 'YUMMLY provide') {
                updateRecipeHelper(undefined, recipe);
            } else {
                userService
                    .findUserByUsername(username)
                    .then(function (user) {
                        if (!user) {
                            model.error = "Username does not exist";
                        } else if (user.role !== 'RECIPEPRO') {
                            model.error = 'User is not a recipe provider';
                        } else {
                            updateRecipeHelper(user._id, recipe);
                        }
                    })
                    .catch(function (error) {
                        if (error.status === 404) {
                            model.error = "Username does not exist";
                        }
                    })
            }
        }

        function updateRecipeHelper(userId, recipe) {
            recipe._creator = userId;
            recipeService
                .updateRecipe(recipe._id, recipe)
                .then(findAllRecipes());
            model.recipe = {};
            model.username = '';
        }

        function selectRecipe(recipe) {
            model.message = false;
            model.error = false;

            model.recipe = angular.copy(recipe);
            if (recipe._creator !== undefined) {
                model.username = recipe._creator.username;
            } else {
                model.username = 'YUMMLY provide';
            }
            $location.url('/auth_recipe_list/' + recipe._id);
        }

        function createRecipe(username, recipe) {
            model.message = false;
            model.error = false;


            userService
                .findUserByUsername(username)
                .then(function (user) {
                    if (user === undefined) {
                        model.error = "Username does not exist";
                    } else if (user.role !== 'RECIPEPRO') {
                        model.error = 'User is not a recipe provider';
                    } else {
                        recipe._creator = user.id;


                        recipeService
                            .createRecipe(user._id, recipe)
                            .then(findAllRecipes());

                        model.recipe = {};
                        model.username = '';
                    }
                });
        }

        function deleteRecipe(recipe) {
            model.error = false;
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
                    console.log();
                })
        }

    }

})();