(function () {
    angular
        .module('FinalProject')
        .controller('profileController', profileController);

    function profileController($routeParams, userService, $location, currentUser, storeService) {

        var model = this;
        model.sectionTitle = "Profile";
        model.render = render;

        function init() {
            console.log(currentUser.roles.indexOf("MERCHANT"));
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
                    )
                return;
            }

            model.userId = currentUser._id;
            console.log(currentUser);
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
                })
        }
    }
})();

