(function () {
    angular
        .module("FinalProject")
        .controller("recipeDetailController", RecipeDetailController);
    
    function RecipeDetailController($sce, currentUser, $location, $routeParams,
                                    recipeService, yummlyService, userService, associationService) {

        var model = this;

        model.trust = trust;
        model.goToIngredientDetail = goToIngredientDetail;
        model.likeRecipe = likeRecipe;
        model.unlikeRecipe = unlikeRecipe;
        model.createComment = createComment;
        model.submitComment = submitComment;
        // userId = currentUser._id;
        model.recipeId = $routeParams.recipeId;

        // console.log(model.recipeId);

        function init() {
            // console.log($location.hash());
            if ($location.hash() === "LOCAL") {
                model.ifLocal = true;
                recipeService
                    .findRecipeById(model.recipeId)
                    .then(function (recipe) {
                        model.recipeLocalId = recipe._id;
                        model.recipe = recipe;
                    })
                    .then(function () {
                        associationService
                            .findAllReviewByRecipeId(model.recipeLocalId)
                            .then(function (reviews) {
                                model.reviews = reviews;
                            })
                    });
            } else {

                yummlyService
                    .detailRecipe(model.recipeId)
                    .then(function (recipe) {
                        // console.log(recipe);
                        model.recipe = recipe;
                        combineIngredientAndDescription();
                        recipeService
                            .findYummlyRecipeCopyByYummlyId(model.recipeId)
                            .then(function (recipe) {
                                if (recipe) {
                                    model.recipeLocalId = recipe._id;
                                    associationService
                                        .findAllRecipeReview(model.recipeLocalId)
                                        .then(function (reviews) {
                                            model.reviews = reviews;
                                        })
                                }
                            });

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
            var ingredients = recipeService
                .getTempYummlyRecipe(model.recipeId);
            model.recipe.ingredients = [];
            for (var i in model.recipe.ingredientLines) {
                model.recipe.ingredients.push({
                    name: ingredients[i],
                    description: model.recipe.ingredientLines[i]
                });
            }
        }

        function createYummlyRecipeCopy() {
            var recipeCopy = {
                name: model.recipe.name,
                yummlyId: model.recipeId,
                source: 'YUMMLY'
            };

            recipeService
                .createYummlyLocalRecipeCopy(recipeCopy)
                .then(function (recipe) {
                    model.recipeLocalId = recipe._id;
                })
        }

        function likeRecipe() {
            if(!model.recipeLocalId) {
                createYummlyRecipeCopy();
            }
            var like = {
                fromWhom : currentUser._id,
                toRecipe : model.recipeLocalId,
                type: 'LIKE'
            };

            associationService
                .createLike(like)
                .then(function () {
                    model.likeThis = true;
                });

        }

        function unlikeRecipe() {
            associationService
                .deleteRecipeLike(currentUser._id, model.recipeLocalId)
                .then(function () {
                    model.likeThis = true;
                });

        }

        function createComment() {
            model.reviews = [];
            model.newComment = {};
        }

        function submitComment() {
            if(!model.recipeLocalId) {
                createYummlyRecipeCopy();
            }
            // console.log(model.recipeLocalId);
            model.newComment.fromWhom = currentUser._id;
            model.newComment.toRecipe = model.recipeLocalId;
            model.newComment.type =  'COMMENT';
            associationService
                .createComment(model.newComment)
                .then(function (comment) {
                    // console.log(comment);
                    model.reviews.push(comment);
                })
        }

        function goToIngredientDetail(ingredientName) {
            // console.log(ingredientName);
            $location.url('/recipe_list/' + model.recipeId + '/ingredient/' + ingredientName);
        }
    }
})();
