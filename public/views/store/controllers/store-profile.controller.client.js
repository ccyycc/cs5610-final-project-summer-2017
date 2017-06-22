(function () {
    angular
        .module('FinalProject')
        .controller('storeProfileController', storeProfileController);

    function storeProfileController($routeParams, $location, storeService, $sce) {
        var model = this;
        model.editStoreProfile = editStoreProfile;

        function init() {
            //setup
            model.storeId = $routeParams['storeId'];
            model.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

            model.store = {};
            storeService
                .findAllStoresForOwner("currentUser")
                .then(function (res) {
                    model.store = res[0];
                    model.store.addressUrl = trust("https://www.google.com"
                                                   + "/maps/embed/v1/place?"
                                                   + "key=AIzaSyA0oVg3fT3ZdLkEExxVyC0jkciGfmaYBcI&q="
                                                   + getStoreURLAddress(model.store));
                });


            // model.store={
            //     _owner: "owner123",
            //     name: "storeName",
            //     description: "storeDescription",
            //     hours: [
            //         {open: 9, close: 10},
            //         {open: 10, close: 11},
            //         {open: 11, close: 12}
            //         ],
            //     image: "storeImageUrl",
            //     address:"360 huntington ave, boston, ma 02115",
            //     dateCreated: Date.now()
            // };

            // model.store.address = "360+huntington+ave+boston+ma";

        }

        init();

        function getStoreURLAddress(store) {
            var address = store.address;
            return address.street + "+"
                   + address.city + "+"
                   + address.state + "+"
                   + address.zip;
        }

        function editStoreProfile() {
            $location.url('/store/' + model.storeId + '/edit');
        }

        function trust(url) {
            // scrubbing the html
            return $sce.trustAsResourceUrl(url);
            // return $sce.trustAsUrl(url);
        }
    }
})();