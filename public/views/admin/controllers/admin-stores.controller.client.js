(function () {
    angular
        .module('FinalProject')
        .controller('adminStoresController', adminStoresController);

    function adminStoresController(userService, storeService) {
        var model = this;

        model.deleteStore = deleteStore;
        model.createStore = createStore;
        model.selectStore = selectStore;
        model.updateStore = updateStore;
        // model.currentStore = currentStore;

        function init() {
            // console.log('admin-store.controller');

            findAllStores();
        }

        init();

        function updateStore(username, store) {
            model.message = false;
            model.error = false;

            var thisuser = 'undefined';
            console.log('username: ' + username);
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
                        // delete store[_id];
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
        }

        function createStore(username, store) {
            model.message = false;
            model.error = false;

            var thisuser = 'undefined';

            console.log('username: ' + username);

            userService
                .findUserByUsername(username)
                .then(function (user) {
                    thisuser = user;
                    // console.log('user after findUserByUsername: ' );
                    // console.log(user);
                    if (thisuser === 'undefined') {
                        model.error = "Username does not exist";
                    } else if (thisuser.role !== 'MERCHANT') {
                        model.error = 'User is not a merchant';
                    } else {
                        // var storeId = store._id;
                        // delete store[_id];
                        store._owner = thisuser.id;
                        console.log('admin-stores.controller--create store: ' + store);
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
                })
        }

    }

})();