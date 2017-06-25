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
                // TODO ADDED TO FOOTER
                // {
                //     value: "searchNear",
                //     label: "NearbyStore"
                // }
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
                    text = "I am not a fan of orange.";
                    break;
                case "StoreProfile":
                    text = "How you like them apples?";
                    break;
                case "merchandise":
                    text = "How you like them apples?";
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
