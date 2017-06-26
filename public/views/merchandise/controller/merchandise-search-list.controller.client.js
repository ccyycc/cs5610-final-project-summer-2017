(function () {
    angular
        .module('FinalProject')
        .controller('merchandiseSearchController', merchandiseSearchController);

    function merchandiseSearchController($location, $routeParams, merchandiseService,
                                         userService, currentUser) {
        var model = this;
        //event handler

        model. searchProduct=searchProduct ;
        model.logout = logout;

        init();

        function init() {

            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            model.sectionTitle = "Product Search";

            var preSearch = $location.search();
            if(preSearch.search &&preSearch.search.length>0){
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

        function searchProduct(){
            merchandiseService
                .findMerchandiseByName(model.searchContent)
                .then(function(products){
                    model.products = products
                })

        }



        function createMerchandise() {
            $location.url("/store/"+model.storeId+"/merchandise/undefined/new");
        }

    }
})();