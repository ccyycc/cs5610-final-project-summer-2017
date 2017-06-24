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
        model.renderLikedRecipes = renderLikedRecipes;
        model.renderCollectedProducts = renderCollectedProducts;

        function init() {
            if ($routeParams.uid) {
                model.userId = $routeParams.uid;
            } else {
                model.userId = currentUser._id;
            }

            // console.log(model.userId);

            // console.log(currentUser.roles.indexOf("MERCHANT"));
            if(currentUser.roles.indexOf("MERCHANT") > -1){
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
            renderLikedRecipes();

            model.recipeOrProduct = 'RECIPE';

            // TODO: TEST
            if (currentUser.roles.indexOf('RECIPEPRO') !== -1) {
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

        function renderLikedRecipes() {
            userService
                .populateArr(model.userId, 'likedRecipes')
                .then(function (likedRecipes) {
                    model.likedRecipes = likedRecipes;
                })
        }

        function renderCollectedProducts() {
            userService
                .populateArr(model.userId, 'collectedProducts')
                .then(function (products) {
                    model.collectedProducts = products;
                })
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
    }
})();

