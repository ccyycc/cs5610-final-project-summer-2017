(function () {
    angular
        .module('FinalProject')
        .controller('adminStoresController', adminStoresController);

    function adminStoresController($location,userService, storeService,currentUser) {
        var model = this;

        model.sectionTitle = "Manage Store Profile";

        model.deleteStore = deleteStore;
        model.createStore = createStore;
        model.selectStore = selectStore;
        model.updateStore = updateStore;
        model.logout = logout;

        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
            findAllStores();
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function updateStore(username, store) {
            model.message = false;
            model.error = false;

            var thisuser = 'undefined';
            userService
                .findUserByUsername(username)
                .then(function (user) {
                    thisuser = user;
                    if (thisuser === 'undefined') {
                        model.error = "Username does not exist";
                    } else if (thisuser.role !== 'MERCHANT') {
                        model.error = 'User is not a merchant';
                    }else {
                        var storeId = store._id;
                        store._owner = thisuser._id;
                        storeService
                            .updateStore(storeId, store)
                            .then(findAllStores());

                        model.store = {};
                        model.username = '';
                    }
                });

        }

        function selectStore(store) {
            model.message = false;
            model.error = false;

            model.store = angular.copy(store);
            model.username = store._owner.username;
            $location.url('/store/' + store._id);
        }

        function createStore(username, store) {
            model.message = false;
            model.error = false;

            var thisuser = 'undefined';


            userService
                .findUserByUsername(username)
                .then(function (user) {
                    thisuser = user;
                    if (thisuser === 'undefined') {
                        model.error = "Username does not exist";
                    } else if (thisuser.role !== 'MERCHANT') {
                        model.error = 'User is not a merchant';
                    } else {
                        store._owner = thisuser.id;

                        storeService
                            .createStore(thisuser._id, store)
                            .then(findAllStores());

                        model.store = {};
                        model.username = '';
                    }
                });
        }

        function deleteStore(store) {
            model.error = false;
            model.message = false;

            storeService
                .deleteStore(store._id)
                .then(findAllStores());
        }

        function findAllStores() {
            storeService
                .findAllStores()
                .then(function (stores) {
                    model.stores = stores;
                    console.log();
                })
        }

    }

})();