(function () {
    angular
        .module("FinalProject")
        .controller("recipeDetailController", RecipeDetailController);
    
    function RecipeDetailController($sce, $location, $routeParams, recipeService, yummlyService) {

        var model = this;

        model.trust = trust;
        model.goToIngredientDetal = goToIngredientDetal;
        // userId = currentUser._id;
        model.recipeId = $routeParams.recipeId;

        console.log(model.recipeId);

        function init() {
            // console.log($location.hash());
            if ($location.hash() === "LOCAL") {
                model.ifLocal = true;
                recipeService
                    .findRecipeById(model.recipeId)
                    .then(function (recipe) {
                        model.recipe = recipe;
                    });
            } else {

                yummlyService
                    .detailRecipe(model.recipeId)
                    .then(function (recipe) {
                        // console.log(recipe);
                        model.recipe = recipe;
                        combineIngredientAndDescription();
                        // console.log(recipe.ingredients);
                        // console.log(recipe.ingredientLines);

                        // console.log(model.recipe.ingredients);

                        // model.recipe.ingredients = recipe.ingredientLines;
                    });
            }
        }

        init();

        function trust(url) {
            // scrubbing the html
            return $sce.trustAsResourceUrl(url);
            // return $sce.trustAsUrl(url);
        }

        function combineIngredientAndDescription() {
            //ingredients[i] model.recipe.ingredientLines[i];
            var ingredients = recipeService
                .getTempYummlyRecipe(model.recipeId);
            // console.log(ingredients);
            model.recipe.ingredients = [];
            for (var i in model.recipe.ingredientLines) {
                model.recipe.ingredients.push({
                    name: ingredients[i],
                    description: model.recipe.ingredientLines[i]
                });
                // console.log(model.recipe.ingredients);

            }
        }

        function goToIngredientDetal(ingredientName) {
            // console.log(ingredientName);
            $location.url('/ingredient/' + ingredientName);
        }
    }
})();
