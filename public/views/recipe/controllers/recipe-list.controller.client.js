(function () {
    angular
        .module("FinalProject")
        .controller("recipeListController", RecipeListController);

    function RecipeListController($location, recipeService, yummlyService, userService, currentUser) {

        var model = this;

        model.searchRecipes = searchRecipes;
        model.goToDetail = goToDetail;
        model.getMoreYummlyRecipe = getMoreYummlyRecipe;
        model.logout = logout;
        // userId = currentUser._id;

        function init(){

            model.sectionTitle = 'Recipe Search Result';
            model.currentYummlyPage = 0;

            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            var preSearch = $location.search();
            if(preSearch &&preSearch.search.length>0){
                model.searchText = preSearch.search;
                searchRecipes();
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

        function getMoreYummlyRecipe() {
            model.currentYummlyPage += 1;
            yummlyService
                .searchRecipes(model.searchText, model.currentYummlyPage)
                .then(function (recipes) {
                    // model.yummlyRecipes = response.data;
                    model.yummlyRecipes = recipes;
                    // console.log(model.yummlyRecipes);

                });
        }

        function searchRecipes() {
            yummlyService
                .searchRecipes(model.searchText, model.currentYummlyPage)
                .then(function (recipes) {
                    // model.yummlyRecipes = response.data;
                    model.yummlyRecipes = recipes;
                    // console.log(model.yummlyRecipes);

                });

            recipeService
                .findRecipeByCriteria(model.searchText)
                .then(function (recipes) {
                    model.localRecipes = recipes;
                })
        }

        function goToDetail(recipe, recipeId) {
            recipeService
                .tempYummlyIngredients(recipe.ingredients);
            $location.url("/recipe_list/" + recipeId + "#" + recipe.source);
        }
    }
})();

