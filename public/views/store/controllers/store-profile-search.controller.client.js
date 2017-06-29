(function () {
    angular
        .module("FinalProject")
        .controller("storeProfileSearchController", storeProfileSearchController);

    function storeProfileSearchController($location, storeService, userService, currentUser) {

        var model = this;
        model.searchStores = searchStores;
        model.goToDetail = goToDetail;
        model.logout = logout;
        model.navToStoreProfile = navToStoreProfile;

        model.sectionTitle = "Store Search Result";

        init();

        function init() {

            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            var preSearch = $location.search();
            if (preSearch && preSearch.search.length > 0) {
                model.searchText = preSearch.search;
                searchStores();
            }
        }


        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function searchStores() {
            storeService
                .findStoreByNameParams(model.searchText)
                .then(function (data) {
                    model.results = data;
                })
        }

        function goToDetail(store, storeId) {
            storeService
                .tempYummlyRecipe(store.ingredients, storeId);
            $location.url("/store/" + storeId);
        }

        function navToStoreProfile(store) {
            if (model.ifLoggedIn) {
                $location.url("/store/" + store._id);
            } else {
                alert('Please log in first.');
                $location.url("/login");
            }
        }
    }
})();

