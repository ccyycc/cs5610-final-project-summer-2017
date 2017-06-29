(function () {
    angular
        .module('FinalProject')
        .controller('merchandiseSearchController', merchandiseSearchController);

    function merchandiseSearchController($location, $routeParams, merchandiseService,
                                         userService, currentUser) {
        var model = this;

        //variable && route params
        model.sectionTitle = "Product Search";

        //event handler
        model.searchProduct = searchProduct;
        model.logout = logout;
        model.navToProductDetail = navToProductDetail;


        init();

        function init() {

            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            var preSearch = $location.search();
            if (preSearch.search && preSearch.search.length > 0) {
                model.searchContent = preSearch.search;
                searchProduct();
            }

        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function searchProduct() {
            merchandiseService
                .findMerchandiseByName(model.searchContent)
                .then(function (products) {
                    model.products = products
                })

        }

        function navToProductDetail(product) {
            if (model.ifLoggedIn) {
                $location.url("/store/" + product._store._id + "/merchandise/" + product._id);
            } else {
                alert('Please log in first.');
                $location.url("/login");
            }
        }

    }
})();