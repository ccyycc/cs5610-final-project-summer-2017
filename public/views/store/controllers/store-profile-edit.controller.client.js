(function () {
    angular
        .module('FinalProject')
        .controller('storeProfileEditController', storeProfileEditController);

    function storeProfileEditController($routeParams, $location, storeService, $sce) {
        var model = this;
        model.updateStore = updateStore;
        model.createStore = createStore;

        init();

        function init() {
            model.storeId = $routeParams['storeId'];
            model.mode = $routeParams['mode'];
            model.user = "currentUser";
            model.store = {};
            model.storeId = $routeParams['storeId'];
            // model.store = storeService.findStoreById(model.storeId);
            model.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            if (model.mode === "new") {
                model.store = {
                    _owner: "",
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
            } else if (model.mode ==="edit"){
                storeService
                    .findAllStoresForOwner(model.storeId)
                    .then(function (data) {
                        model.store=data[0];
                        populateDateObject(model.store);
                    })
            }else{
                navToStoreProfile('');
            }


            // model.store={
            //     _owner: "owner123",
            //     name: "storeName",
            //     description: "storeDescription",
            //     hours: [
            //         {open:(new Date()), close:(new Date())},
            //         {open:(new Date()), close:(new Date())},
            //         {open:(new Date()), close:(new Date())},
            //         {open:(new Date()), close:(new Date())},
            //         {open:(new Date()), close:(new Date())},
            //         {open:(new Date()), close:(new Date())},
            //         {open:(new Date()), close:(new Date())}
            //     ],
            //     image: "storeImageUrl",
            //     address:"360 huntington ave, boston, ma 02115",
            //     dateCreated: Date.now()
            // };
        }

        function updateStore() {
            storeService
                .updateStore(model.store._id, model.store)
                .then(navToStoreProfile);
        }

        function createStore() {
            storeService
                .createStore(model.user, model.store)
                .then(navToStoreProfile);
        }

        function getStoreAddress() {
            return model.address.street
                   + " " + model.address.city
                   + " " + model.address.state
                   + " " + model.address.zip;
        }

        function navToStoreProfile(res) {
            $location.url('/store/'+model.storeId);
        }

        function populateDateObject(store){
            for(var i = 0; i < store.hours.length;i++){
                store.hours[i].open =  new Date(store.hours[i].open);
                store.hours[i].close =  new Date(store.hours[i].close);
            }
        }
    }
})();