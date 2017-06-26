(function () {
    angular
        .module("FinalProject")
        .controller("storeProfileSearchController", storeProfileSearchController);

    function storeProfileSearchController($location, storeService) {

        var model = this;
        model.searchStores = searchStores;
        model.goToDetail = goToDetail;

        // userId = currentUser._id;

        init();

        function init() {
            model.sectionTitle = "Store Search";

            var preSearch = $location.search();
            if (preSearch && preSearch.search.length > 0) {
                model.searchText = preSearch.search;
                searchStores();
            }
        }


        function searchStores() {
            storeService
                .findStoreByName(model.searchText)
                .then(function (data) {
                    model.results=data;
                })
        }

        function goToDetail(store, storeId) {
            storeService
                .tempYummlyRecipe(store.ingredients, storeId);
            $location.url("/store/" + storeId);
        }
    }
})();

