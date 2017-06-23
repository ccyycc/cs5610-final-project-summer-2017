(function () {
    angular
        .module('FinalProject')
        .controller('storeProfileEditController', storeProfileEditController);

    function storeProfileEditController($routeParams, $location, storeService, $sce,currentUser) {
        var model = this;
        model.updateStore = updateStore;
        model.createStore = createStore;

        init();

        function init() {
            model.storeId = $routeParams['storeId'];
            model.mode = $routeParams['mode'];
            console.log(model);
            model.user = currentUser;
            model.store = {};
            // model.store = storeService.findStoreById(model.storeId);
            model.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            if (model.mode === "new") {
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
            } else if (model.mode ==="edit"){
                storeService
                    .findAllStoresForOwner(currentUser._id)
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
                .then(function (store) {
                    $location.url('/store/'+model.store._id);
                });
        }

        function createStore() {
            storeService
                .createStore(model.user._id, model.store)
                .then(function (store) {
                    $location.url('/store/'+store._id);
                });
        }

        function getStoreAddress() {
            return model.address.street
                   + " " + model.address.city
                   + " " + model.address.state
                   + " " + model.address.zip;
        }


        function populateDateObject(store){
            for(var i = 0; i < store.hours.length;i++){
                store.hours[i].open =  new Date(store.hours[i].open);
                store.hours[i].close =  new Date(store.hours[i].close);
            }
        }
    }
})();