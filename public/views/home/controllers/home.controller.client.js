(function () {
    angular
        .module("FinalProject")
        .controller("homeController", homeController);

    function homeController(userService, $location, $route, yummlyService, currentUser) {

        var model = this;

        model.logout = logout;
        model.searchWithCoords = searchWithCoords;

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


        init();
        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
            model.currentUser = currentUser;
            model.searchContent = "";
            model.searchType = "recipe";
        }


        function searchWithCoords(){


            switch(model.searchType) {
                case "recipe":
                    $location.url('/recipe_list?search='+model.searchContent);
                    break;
                case "UserProfile":
                    $location.url('/search/user?search='+model.searchContent);
                    break;
                case "StoreProfile":
                    $location.url('/search/store?search='+model.searchContent);
                    break;
                case "merchandise":
                    $location.url('/search/merchandise?search='+model.searchContent);
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
