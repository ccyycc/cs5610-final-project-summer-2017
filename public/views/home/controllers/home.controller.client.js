(function () {
    angular
        .module("FinalProject")
        .controller("homeController", homeController);

    function homeController(userService, $location, $route, yummlyService, currentUser) {

        var model = this;

        //variables & route params
        model.currentUser = currentUser;
        model.searchContent = "";
        model.searchType = "recipe";
        model.searchOptions = [
            {
                value: "recipe",
                label: "Recipe"
            }, {
                value: "UserProfile",
                label: "User"
            }, {
                value: "StoreProfile",
                label: "Store"
            }, {
                value: "merchandise",
                label: "Product"
            }
        ];

        //event handler
        model.logout = logout;
        model.searchWithCoords = searchWithCoords;

        init();
        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
        }


        function searchWithCoords() {


            switch (model.searchType) {
                case "recipe":
                    $location.url('/recipe_list?search=' + model.searchContent);
                    break;
                case "UserProfile":
                    $location.url('/search/user?search=' + model.searchContent);
                    break;
                case "StoreProfile":
                    $location.url('/search/store?search=' + model.searchContent);
                    break;
                case "merchandise":
                    $location.url('/search/merchandise?search=' + model.searchContent);
                    break;
                default:
                    text = "I have never heard of that fruit...";
            }
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();
