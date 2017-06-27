(function () {
    angular
        .module('FinalProject')
        .controller('StoreSearchNearByController', StoreSearchNearByController);

    function StoreSearchNearByController($routeParams, $location, MapService, $window,
                                   currentUser,userService) {
        var model = this;
        this.searchWithCoords = searchWithCoords;
        this.searchWithAddress = searchWithAddress;


        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            model.sectionTitle = "Nearby search";
            model.address = {};
        }

        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }


        function searchWithCoords() {
            if ($window.navigator.geolocation) {
                return $window.navigator.geolocation.getCurrentPosition(requestSearchWithCoords);
            } else {
                return undefined;
            }
        }

        function searchWithAddress() {
            var fullAddress = model.address.street
                + "+" +model.address.city
                + "+" +model.address.state
                + "+" +model.address.zip;
            fullAddress = fullAddress.replace(/\s/g, '+');
            MapService.searchWithAddress(fullAddress)
                .then(
                    function (res) {
                        model.places = res.results;
                    }
                );
        }

        function requestSearchWithCoords(position) {
            var currentCoords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            MapService.searchWithCoords(currentCoords)
                .then(
                    function (res) {
                        model.places = res.results;
                    }
                );
        }


    }
})();