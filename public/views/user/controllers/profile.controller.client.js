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
                .populateRecipesAndProducts(userId)
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
                    model.message="";
                })
        }
    }
})();

