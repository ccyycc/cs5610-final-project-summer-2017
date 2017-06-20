(function () {
    angular
        .module('FinalProject')
        .controller('profileController', profileController);

    function profileController($routeParams, userService, $location, currentUser) {

        var model = this;

        model.render = render;

        function init() {
            model.userId = currentUser._id;
            console.log(model.userId);
            render(model.userId);

            model.recipeOrProduct = 'RECIPE';
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

