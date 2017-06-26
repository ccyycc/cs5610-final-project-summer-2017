(function () {
    angular
        .module('FinalProject')
        .controller('profileController', profileController);

    function profileController($routeParams, userService, $location, currentUser, storeService) {

        var model = this;
        model.sectionTitle = "Profile";

        model.render = render;
        model.follow = follow;
        model.unfollow = unfollow;
        model.sendMessage = sendMessage;
        model.showFollowers = showFollowers;
        model.showFollowings = showFollowings;
        model.showLikedRecipes = showLikedRecipes;
        model.showCollectedProducts = showCollectedProducts;
        model.countPhotoWidth = countPhotoWidth;
        // model.showRecipes = showRecipes;
        // model.showProducts = showProducts;

        function init() {
            if (currentUser._id === $routeParams.uid){
                $location.url("/profile", false);
            }

            if ($routeParams.uid) {
                model.userId = $routeParams.uid;
            } else {
                model.userId = currentUser._id;
            }

            countPhotoWidth();

            // console.log(model.userId);

            // console.log(currentUser.roles.indexOf("MERCHANT"));
            if(currentUser.role === "MERCHANT"){
                //TODO CHANGE TO FOLLOWING WHEN SCHEMA IS FIXED
                // if(currentUser.roles.indexOf("MERCHANT") > -1){
                    storeService
                    .findAllStoresForOwner(currentUser._id)
                    .then(function (data) {
                        if(data.length === 0){
                            $location.url('/store/undefined/new');
                        }else{
                            $location.url('/store/'+data[0]._id);
                        }
                        }
                    );
                return;
            }

            render(model.userId);
            showLikedRecipes();

            model.recipeOrProduct = 'RECIPE';

            // TODO: TEST
            if (currentUser.role === 'RECIPEPRO') {
                model.isRecipeProvider = true;
            }
            //TODO: END OF TEST
        }

        init();

        function render(userId) {
            userService
                .findUserById(userId)
                .then(function (user) {
                    model.user = user;

                    if (model.user.followers.indexOf(currentUser._id) > -1) {
                        model.followed = true;
                    } else {
                        model.followed = false;
                    }
                    console.log(model.user.role);
                })
        }

        function showLikedRecipes() {
            userService
                .populateArr(model.userId, 'likedRecipes')
                .then(function (likedRecipes) {
                    console.log(likedRecipes);
                    model.likedRecipes = likedRecipes;
                    model.recipeOrProduct = 'RECIPE';
                    console.log(model.likedRecipes)
                });


        }

        function showCollectedProducts() {
            userService
                .populateArr(model.userId, 'collectedProducts')
                .then(function (products) {
                    model.collectedProducts = products;
                })
            model.recipeOrProduct = 'PRODUCT';
        }

        function follow() {
            userService
                .follow(model.userId)
                .then(function (user) {
                    model.render(model.userId);
                })
        }

        function unfollow() {
            userService
                .unfollow(model.userId)
                .then(function (user) {
                    model.render(model.userId);
                })
        }

        function sendMessage(message) {
            userService
                .sendMessage(model.userId, [message])
                .then(function (user) {
                    model.message = "";
                })
        }

        function showFollowings() {
            userService
                .populateArr(model.userId, 'followings')
                .then(function (followings) {
                    model.follows = followings;
                    $location.url = "#followDetail";

                    if (model.followType === 'followers') {
                        $("#followDetail").collapse('show');
                    } else {
                        $("#followDetail").collapse('toggle');
                    }
                    model.followType = 'followings';
                    // console.log(model.follows);
                })
        }

        function showFollowers() {
            userService
                .populateArr(model.userId, 'followers')
                .then(function (followers) {
                    model.follows = followers;
                    $location.url = "#followDetail";
                    if (model.followType === 'followings') {
                        $("#followDetail").collapse('show');
                    } else {
                        $("#followDetail").collapse('toggle');
                    }
                    model.followType = 'followers';

                })
        }

        function countPhotoWidth() {
            console.log(screen.width);
            if (screen.width > 500) {
                model.profilePhotoWidth = '40%';
            } else {
                model.profilePhotoWidth = '100%';
            }
        }
    }
})();

