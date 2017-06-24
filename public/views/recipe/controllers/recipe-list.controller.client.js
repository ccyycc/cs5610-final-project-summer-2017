(function () {
    angular
        .module("FinalProject")
        .controller("recipeListController", RecipeListController);

    function RecipeListController($location, recipeService, yummlyService) {

        var model = this;
        model.searchRecipes = searchRecipes;
        model.goToDetail = goToDetail;

        // userId = currentUser._id;

        function searchRecipes(searchText) {

            yummlyService
                .searchRecipes(searchText)
                .then(function (recipes) {
                    // model.yummlyRecipes = response.data;
                    model.yummlyRecipes = recipes;
                    // console.log(model.yummlyRecipes);

                });

            recipeService
                .findRecipeByCriteria(searchText)
                .then(function (recipes) {
                    model.localRecipes = recipes;
                })
        }

        function goToDetail(recipe, recipeId) {
            recipeService
                .tempYummlyRecipe(recipe.ingredients, recipeId);
            $location.url("/recipe_list/" + recipeId + "#" + recipe.source);
        }
    }
})();

