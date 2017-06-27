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
        model.clearComment = clearComment;
        model.logout = logout;
        model.goToEdit = goToEdit;

        model.numberOfLikes = 0;

        function init() {

            model.sectionTitle = "Recipe Detail";

            model.recipeId = $routeParams.recipeId;
            model.showYummlyInstruction = false;
            model.reviews =[];

            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            if ($location.hash() === "LOCAL") {
                model.ifLocal = true;
                recipeService
                    .findRecipeById(model.recipeId)
                    .then(function (recipe) {
                        model.recipeLocalId = recipe._id;
                        model.recipe = recipe;
                        model.recipeCreator = recipe._creator;
                        model.canEdit = ((currentUser._id === model.recipeCreator._id)
                        || (currentUser.role === 'ADMIN'));
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

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function goToEdit() {
            $location.url("/auth_recipe_list/"+ model.recipeId);
        }

        function trust(url) {
            // scrubbing the html
            return $sce.trustAsResourceUrl(url);
        }

        function findAllAssociation() {
            associationService
                .findAssociationForTarget('COMMENT', 'recipe', model.recipeLocalId)
                .then(function (reviews) {
                    model.reviews = reviews;
                });
            associationService
                .findAssociationForSourceTarget('LIKE', currentUser._id, 'recipe', model.recipeLocalId)
                .then(function (likes) {
                    if(likes.length !== 0) {
                        // console.log(like);
                        model.likeId = likes[0]._id;
                        model.like = true;
                        model.footerButton = "glyphicon glyphicon-heart";
                    } else {
                        model.like = false;
                        model.footerButton = "glyphicon glyphicon-heart-empty";
                    }
                })
            associationService
                .findAssociationForTarget('LIKE', 'recipe', model.recipeLocalId)
                .then(function (likes) {
                    model.numberOfLikes = likes.length;
                })
        }

        function combineIngredientAndDescription() {
            var ingredients = recipeService.getTempYummlyIngredients();
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
                source: 'YUMMLY',
                ingredients: model.recipe.ingredients
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
                .createAssociation(like)
                .then(function (like) {
                    model.numberOfLikes += 1;
                    model.likeId = like._id;
                    model.like = true;
                    model.footerButton = "glyphicon glyphicon-heart";
                })
                .then(function () {
                    userService
                        .addLikedRecipe(model.recipeLocalId);
                })

        }

        function unlikeRecipe() {
            associationService
                .deleteAssociationById(model.likeId)
                .then(function () {
                    model.numberOfLikes -= 1;
                    model.like = false;
                    model.footerButton = "glyphicon glyphicon-heart-empty";
                })
                .then(function () {
                    userService
                        .deleteLikedRecipe(model.recipeLocalId);
                })
        }

        function createComment() {
            model.newComment = {};
        }

        function clearComment() {
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
                .createAssociation(model.newComment)
                .then(function (comment) {
                    comment.fromWhom = {
                        username : currentUser.username
                    };
                    model.reviews.push(comment);
                    model.newComment = null;
                })
        }

        function goToIngredientDetail(ingredientName) {
            $location.url('/recipe_list/' + model.recipeId + '/ingredient/' + ingredientName);
        }
    }
})();
