(function () {
    angular
        .module("FinalProject")
        .controller("recipeDetailController", RecipeDetailController);
    
    function RecipeDetailController($sce, currentUser, $location, $routeParams,
                                    recipeService, yummlyService, associationService, userService) {

        var model = this;

        model.trust = trust;
        model.goToIngredientDetail = goToIngredientDetail;
        model.likeRecipe = likeRecipe;
        model.unlikeRecipe = unlikeRecipe;
        model.createComment = createComment;
        model.submitComment = submitComment;
        model.footerButtonFunc = footerButtonFunc;
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
                        model.recipeCreator = recipe._creator;
                    })
                    .then(function () {
                        findAllAssociation();
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
                                    findAllAssociation();
                                }
                            });
                    });

            }
        }

        init();

        function footerButtonFunc() {
            if (model.like) {
                unlikeRecipe();
            } else {
                likeRecipe();
            }
        }

        function trust(url) {
            // scrubbing the html
            return $sce.trustAsResourceUrl(url);
        }

        function findAllAssociation() {
            associationService
                .findAllRecipeReview(model.recipeLocalId)
                .then(function (reviews) {
                    model.reviews = reviews;
                });
            associationService
                .findLikeForRecipe(currentUser._id, model.recipeLocalId)
                .then(function (like) {
                    console.log(like);
                    model.likeId = like._id;
                    model.like = true;
                    model.footerButton = "glyphicon glyphicon-heart";
                }, function () {
                    model.like = false;
                    model.footerButton = "glyphicon glyphicon-heart-empty";
                })
        }

        function combineIngredientAndDescription() {
            var ingredients = recipeService
                .getTempYummlyIngredients();
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

            return recipeService
                .createYummlyLocalRecipeCopy(recipeCopy)
                .then(function (recipe) {
                    model.recipeLocalId = recipe._id;
                })
        }

        function likeRecipe() {
            if(!model.recipeLocalId) {
                createYummlyRecipeCopy()
                    .then(function () {
                       likeHelper();
                    })
            } else {
                likeHelper();
            }
        }

        function likeHelper() {
            var like = {
                fromWhom : currentUser._id,
                toRecipe : model.recipeLocalId,
                type: 'LIKE'
            };

            associationService
                .createLike(like)
                .then(function (like) {
                    model.likeId = like._id;
                    model.like = true;
                    model.footerButton = "glyphicon glyphicon-heart";
                });

            userService
                .addLikedRecipe(model.recipeLocalId);
        }

        function unlikeRecipe() {
            associationService
                .deleteRecipeLike(model.likeId)
                .then(function () {
                    model.like = false;
                    model.footerButton = "glyphicon glyphicon-heart-empty";
                });

            userService
                .deleteLikedRecipe(model.recipeLocalId);
        }

        function createComment() {
            model.reviews = [];
            model.newComment = {};
        }

        function submitComment() {
            if(!model.recipeLocalId) {
                createYummlyRecipeCopy()
                    .then(function () {
                        commentHelper();
                    })
            } else {
                commentHelper();
            }
        }

        function commentHelper() {
            model.newComment.fromWhom = currentUser._id;
            model.newComment.toRecipe = model.recipeLocalId;
            model.newComment.type =  'COMMENT';
            associationService
                .createComment(model.newComment)
                .then(function (comment) {
                    model.reviews.push(comment);
                })
        }

        function goToIngredientDetail(ingredientName) {
            // console.log(ingredientName);
            $location.url('/recipe_list/' + model.recipeId + '/ingredient/' + ingredientName);
        }
    }
})();
