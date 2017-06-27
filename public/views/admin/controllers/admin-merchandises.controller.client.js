(function () {
    angular
        .module('FinalProject')
        .controller('adminMerchandisesController', adminMerchandisesController);

    function adminMerchandisesController($location,storeService, merchandiseService,currentUser) {
        var model = this;

        model.sectionTitle = "Manage Products";

        model.deleteMerchandise = deleteMerchandise;
        model.createMerchandise = createMerchandise;
        model.selectMerchandise = selectMerchandise;
        model.updateMerchandise = updateMerchandise;

        model.logout = logout;

        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
            findAllMerchandises();
        }


        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function updateMerchandise(storename, merchandise) {
            model.message = false;
            model.error = false;

            console.log('storename: ' + storename);
            storeService
                .findStoreByName(storename)
                .then(function (store) {
                    if (store === undefined) {
                        model.error = "Store does not exist";
                    } else {
                        merchandise._creator = store._id;
                        merchandiseService
                            .updateMerchandise(merchandise._id, merchandise)
                            .then(findAllMerchandises());
                    }
                });

        }

        function selectMerchandise(merchandise) {
            model.message = false;
            model.error = false;

            model.merchandise = merchandise;
            model.storeName = merchandise._store.name;
        }

        function createMerchandise(storename, merchandise) {
            model.message = false;
            model.error = false;

            // var store = 'undefined';

            console.log('storename: ' + storename);

            storeService
                .findStoreByName(storename)
                .then(function (store) {
                    if (store === undefined) {
                        model.error = "Store does not exist";
                    } else {
                        merchandise._creator = store.id;
                        merchandiseService
                            .createMerchandise(store._id, merchandise)
                            .then(findAllMerchandises());

                    }
                });
        }

        function deleteMerchandise(merchandise) {
            model.error = false;
            model.message = false;

            merchandiseService
                .deleteMerchandise(merchandise._id)
                .then(findAllMerchandises());
        }

        function findAllMerchandises() {
            merchandiseService
                .findAllMerchandises()
                .then(function (merchandises) {
                    model.merchandises = merchandises;
                    model.merchandise = {};
                    model.storeName = '';
                })
        }

    }

})();