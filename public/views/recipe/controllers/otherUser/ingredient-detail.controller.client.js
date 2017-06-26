(function () {
    angular
        .module("FinalProject")
        .controller("ingredientDetailController", IngredientDetailController);

    function IngredientDetailController($routeParams, edamamService, merchandiseService,
                                        currentUser, userService) {

        var model = this;

        model.logout = logout;

        function init() {

            model.sectionTitle = "Ingredient Detail";
            model.ingredientName = $routeParams.ingredientName;

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
                })
        }

        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
    }
})();
