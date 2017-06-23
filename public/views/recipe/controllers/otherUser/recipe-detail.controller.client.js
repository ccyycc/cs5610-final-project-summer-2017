(function () {
    angular
        .module("FinalProject")
        .controller("recipeDetailController", RecipeDetailController);
    
    function RecipeDetailController($sce, currentUser, $location, $routeParams,
                                    recipeService, yummlyService, userService, commentService) {

        var model = this;

        model.trust = trust;
        model.goToIngredientDetal = goToIngredientDetal;
        model.likeRecipe = likeRecipe;
        model.createComment = createComment;
        model.submitComment = submitComment;
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
                commentService
                    .findAllRecipeReview(model.recipeId)
                    .then(function (reviews) {
                        model.reviews = reviews;
                    })
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
            //TODO:recipe review for recipe from online?

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

        function likeRecipe() {
            if (!model.ifLocal) {
                var newRecipe = {
                    name: model.recipe.name,
                    totalTime: model.recipe.totalTime,
                    numberOfServings: model.recipe.numberOfServings,
                    ingredients: model.recipe.ingredients
                };
                recipeService
                    .createYummlyLocalRecipeCopy(model.recipeId, newRecipe)
                    .then(function (recipe) {
                        model.recipeLocalId = recipe._id;
                    })

            } else {
                model.recipeLocalId = model.recipeId;
            }
            userService
                .findUserById(currentUser._id)
                .then(function (user) {
                    console.log(user);
                    user.likedRecipes.push(model.recipeLocalId);
                    userService
                        .updateUser(currentUser._id, user);
                });

        }

        function createComment() {
            model.newComment = {};
        }

        function submitComment() {
            var newComment = {
                content: model.newComment.content,
                fromWhom: currentUser._id,
                toRecipe:  model.recipeId
            };
            commentService
                .createComment(newComment)
                .then(function (comment) {

                })
        }

        function goToIngredientDetal(ingredientName) {
            // console.log(ingredientName);
            $location.url('/recipe_list/' + model.recipeId + '/ingredient/' + ingredientName);
        }
    }
})();
