(function () {
    angular
        .module('FinalProject')
        .controller('storeProfileEditController', storeProfileEditController);

    function storeProfileEditController($routeParams, $location, storeService, $sce, currentUser, userService) {
        var model = this;

        //variable & route params
        model.storeId = $routeParams['storeId'];
        model.mode = $routeParams['mode'];
        model.sectionTitle = model.mode+" Store";
        model.user = currentUser;
        model.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        model.store = {};

        //event handler
        model.updateStore = updateStore;
        model.createStore = createStore;
        model.logout = logout;


        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            if (model.mode === "new") {
                model.canEdit = (currentUser.role === "MERCHANT" || currentUser.role === "ADMIN");
                model.store = {
                    name: "",
                    description: "",
                    hours: [
                        {},
                        {},
                        {},
                        {},
                        {},
                        {},
                        {}
                    ],
                    image: "",
                    address: {},
                    dateCreated: Date.now()
                };
            } else if (model.mode === "edit") {
                storeService
                    .findStoreById(model.storeId)
                    .then(function (store) {
                        model.store = store;
                        model.canEdit = (currentUser.role === "ADMIN" || model.store._owner === currentUser._id);
                        if (!model.canEdit) {
                            $location.url('/');
                        }
                        populateDateObject(model.store);
                    })
            } else {
                navToStoreProfile('');
            }
        }

        function updateStore() {
            storeService
                .updateStore(model.store._id, model.store)
                .then(function (store) {
                    $location.url('/store/' + model.store._id);
                });
        }

        function createStore() {
            storeService
                .createStore(model.user._id, model.store)
                .then(function (store) {
                    $location.url('/store/' + store._id);
                });
        }

        function getStoreAddress() {
            return model.address.street
                + " " + model.address.city
                + " " + model.address.state
                + " " + model.address.zip;
        }


        function populateDateObject(store) {
            for (var i = 0; i < store.hours.length; i++) {
                store.hours[i].open = new Date(store.hours[i].open);
                store.hours[i].close = new Date(store.hours[i].close);
            }
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
    }
})();