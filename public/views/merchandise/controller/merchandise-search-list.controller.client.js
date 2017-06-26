(function () {
    angular
        .module('FinalProject')
        .controller('merchandiseSearchController', merchandiseSearchController);

    function merchandiseSearchController($location, $routeParams, merchandiseService) {
        var model = this;
        //event handler

        model. searchProduct=searchProduct ;
        init();

        function init() {
            model.sectionTitle = "Product Search";

            var preSearch = $location.search();
            if(preSearch.search &&preSearch.search.length>0){
                model.searchContent = preSearch.search;
                searchProduct();
            }

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