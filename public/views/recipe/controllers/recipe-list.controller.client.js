(function () {
    angular
        .module("FinalProject")
        .controller("recipeListController", RecipeListController);

    function RecipeListController($location, recipeService, yummlyService) {

        var model = this;
        model.searchRecipes = searchRecipes;
        model.goToDetail = goToDetail;

        // userId = currentUser._id;

        init()

        function init(){

            var preSearch = $location.search();
            if(preSearch &&preSearch.search.length>0){
                model.searchText = preSearch.search;
                searchRecipes();
            }
        }




        function searchRecipes() {
            yummlyService
                .searchRecipes(model.searchText )
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
                .tempYummlyRecipe(recipe.ingredients, recipeId);
            $location.url("/recipe_list/" + recipeId + "#" + recipe.source);
        }
    }
})();

