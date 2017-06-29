(function () {
    angular
        .module('FinalProject')
        .controller('profileController', profileController);

    function profileController($routeParams, userService, $location, currentUser, storeService) {

        var model = this;

        //variable & route params
        model.sectionTitle = "Profile";
        model.feedback = {};
        model.recipeOrProduct = 'RECIPE';

        //event handler
        model.logout = logout;
        model.render = render;
        model.follow = follow;
        model.unfollow = unfollow;
        model.sendMessage = sendMessage;
        model.showFollowers = showFollowers;
        model.showFollowings = showFollowings;
        model.showLikedRecipes = showLikedRecipes;
        model.showCollectedProducts = showCollectedProducts;
        model.showLikedStores = showLikedStores;
        model.navToStorePage = navToStorePage;
        model.navToRecipeListPage = navToRecipeListPage;


        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
                model.isGeneralUser = currentUser.role === 'USER';
            }
            if (!$routeParams.uid || currentUser._id === $routeParams.uid) {
                model.isMyProfile = true;
                model.profileId = $routeParams.uid || currentUser._id;
            } else {
                model.isMyProfile = false;
                model.profileId = $routeParams.uid;
            }

            countPhotoWidth();
            render(model.profileId);
            showLikedRecipes();
        }

        init();

        function navToStorePage() {

            storeService
                .findAllStoresForOwner(model.profileId)
                .then(function (data) {
                    if (data.length > 0) {
                        $location.url('/store/' + data[0]._id);
                    } else if (currentUser.role === "MERCHANT") {
                        storeService
                            .findAllStoresForOwner(currentUser._id)
                            .then(function (data) {
                                    if (data.length === 0) {
                                        $location.url('/store/undefined/new');
                                    } else {
                                        $location.url('/store/' + data[0]._id);
                                    }
                                }
                            );
                    } else {
                        model.feedback.navToStorePage = "store has not been create yet.";
                    }
                })

        }

        function navToRecipeListPage() {
            if (model.isMyProfile) {
                $location.url("/auth_recipe_list");
            } else {
                $location.url("/creator/" + model.profileId + "/recipe_list");
            }
        }

        function render(profileId) {
            userService
                .findUserById(profileId)
                .then(function (user) {
                    model.user = user;

                    if (model.user.followers.indexOf(currentUser._id) > -1) {
                        model.followed = true;
                    } else {
                        model.followed = false;
                    }
                })
        }

        function showLikedRecipes() {
            userService
                .populateArr(model.profileId, 'likedRecipes')
                .then(function (likedRecipes) {
                    model.likedRecipes = likedRecipes;
                    model.recipeOrProduct = 'RECIPE';
                });


        }

        function showCollectedProducts() {
            userService
                .populateArr(model.profileId, 'collectedProducts')
                .then(function (products) {
                    model.collectedProducts = products;
                    model.recipeOrProduct = 'PRODUCT';
                });
        }

        function showLikedStores() {
            userService
                .populateArr(model.profileId, 'likedStores')
                .then(function (stores) {
                    model.likedStores = stores;
                    model.recipeOrProduct = 'STORE';
                });
        }

        function follow() {
            userService
                .follow(model.profileId)
                .then(function (user) {
                    model.render(model.profileId);
                })
        }

        function unfollow() {
            userService
                .unfollow(model.profileId)
                .then(function (user) {
                    model.render(model.profileId);
                })
        }

        function sendMessage(message) {
            userService
                .sendMessage(model.profileId, [message])
                .then(function (user) {
                    model.message = "";
                    alert("message sended successfully");
                })
        }

        function showFollowings() {
            userService
                .populateArr(model.profileId, 'followings')
                .then(function (followings) {
                    model.follows = followings;

                    if (model.followType === 'followers') {
                        $("#followDetail").collapse('show');
                    } else {
                        $("#followDetail").collapse('toggle');
                    }
                    model.followType = 'followings';
                })
        }

        function showFollowers() {
            userService
                .populateArr(model.profileId, 'followers')
                .then(function (followers) {
                    model.follows = followers;
                    if (model.followType === 'followings') {
                        $("#followDetail").collapse('show');
                    } else {
                        $("#followDetail").collapse('toggle');
                    }
                    model.followType = 'followers';

                })
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }


        function countPhotoWidth() {
            if (screen.width > 500) {
                model.profilePhotoWidth = '40%';
            } else {
                model.profilePhotoWidth = '100%';
            }
        }
    }
})();

