(function () {
    angular
        .module('FinalProject')
        .controller('merchandiseListController', merchandiseListController);

    function merchandiseListController($location, $routeParams, merchandiseService,
                                       currentUser, userService, storeService) {
        var model = this;

        //variable && route params
        model.storeId = $routeParams['storeId'];
        model.sectionTitle = "Product List";

        //event handlers
        model.createMerchandise = createMerchandise;
        model.logout = logout;


        init();

        function init() {

            model.merchandises = [];

            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            storeService
                .findStoreById(model.storeId)
                .then(function (store) {
                    model.canEdit = (currentUser.role === "ADMIN" || store._owner === currentUser._id);
                })

            merchandiseService.findMerchandiseByStoreId(model.storeId)
                .then(
                    function (merchandises) {
                        model.merchandises = merchandises;
                    },
                    function () {
                        alert("cannot find merchandises for users");
                        $location.url('/store/' + model.storeId);
                    }
                );
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function createMerchandise() {
            $location.url("/store/" + model.storeId + "/merchandise/undefined/new");
        }

    }
})();