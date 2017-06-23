(function () {
    angular
        .module("FinalProject")
        .controller("ingredientDetailController", IngredientDetailController);

    function IngredientDetailController($routeParams, edamamService) {

        var model = this;

        model.ingredientName = $routeParams.ingredientName;

        function init() {
            edamamService
                .getIngredientDetail(model.ingredientName)
                .then(function (ingredient) {
                    // console.log(ingredient);
                    model.ingredient = ingredient;
                });
        }

        init();
    }
})();
