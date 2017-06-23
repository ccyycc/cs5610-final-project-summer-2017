(function () {
    angular
        .module("FinalProject")
        .controller("MainController", MainController);

    function MainController(currentUser, userService, $location, $route, yummlyService) {

        var model = this;

        model.logout = logout;
        model.searchRecipes = searchRecipes;
        model.goToDetail = goToDetail;

        model.currentUser = currentUser;

        if (currentUser._id) {
            model.userId = currentUser._id;
        }
        // model.currentUser = currentUser;
        function logout() {
            userService
                .logout()
                .then(function () {
                    $route.reload();
                    // $location.url('/');
                })
        }

        function searchRecipes(searchText) {
            yummlyService
                .searchRecipes(searchText)
                .then(function (response) {
                    // console.log(response.data);

                    // data = response.data.replace('{"criteria":{"q":null,"allowedIngredient":null,"excludedIngredient":null},','');
                    // data = data.substring(0,data.length - 1);
                    // data = JSON.parse(data);
                    model.recipes = response.data.matches;

                    // model.photos = model.recipes.imageUrlsBySize.String(90);
                    // model.recipes = data.recipes;
                });
        }


        function goToDetail(recipe) {
            var recipeId = recipe.id;
            $location.path("/detail/" + recipeId);
        }
    }
})();
