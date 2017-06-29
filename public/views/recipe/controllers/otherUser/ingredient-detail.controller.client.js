(function () {
    angular
        .module("FinalProject")
        .controller("ingredientDetailController", IngredientDetailController);

    function IngredientDetailController($routeParams, edamamService, merchandiseService,
                                        currentUser, userService, $timeout) {

        var model = this;

        //variable & route params
        model.ingredientName = $routeParams.ingredientName;
        model.sectionTitle = "Ingredient Detail";
        model.waitForData = true;

        //event handler
        model.logout = logout;

        function init() {

            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            edamamService
                .getIngredientDetail(model.ingredientName)
                .then(function (ingredient) {
                    // console.log(ingredient);
                    model.ingredient = ingredient;
                });

            merchandiseService
                .findMerchandiseByName(model.ingredientName)
                .then(function (products) {
                    model.localProducts = products;
                });

            timeOut(1500);
        }

        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function timeOut(t) {
            $timeout(
                function () {
                    model.waitForData = false;
                }, t)
        }
    }
})();
