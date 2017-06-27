(function () {
    angular
        .module("FinalProject")
        .controller("homeController", homeController);

    function homeController(userService, $location, $route, yummlyService, currentUser) {

        var model = this;
        model.logout = logout;
        model.searchWithCoords = searchWithCoords;

        init();
        function init() {
            // console.log('home controller');

            if (currentUser._id) {
                model.ifLoggedIn = true;
            }


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
            model.searchType = model.searchOptions[0].value;
            model.searchContent = "";

            model.currentUser = currentUser;
            // // model.windowWidth
            // var w = angular.element($window);
            // w.bind('resize', function () {
            //    model.windowWidth = w[0].innerWidth;
            // });
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
