(function () {
    angular
        .module('FinalProject')
        .controller('StoreSearchNearByController', StoreSearchNearByController);

    function StoreSearchNearByController($routeParams, $location, MapService, $window,
                                         currentUser, userService) {
        var model = this;

        //variable & route params
        model.sectionTitle = "Nearby search";
        model.address = {
            street: '',
            city: '',
            state: '',
            zip: ''
        };

        //event handler
        model.searchWithCoords = searchWithCoords;
        model.searchWithAddress = searchWithAddress;
        model.logout = logout;

        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }


        function searchWithCoords() {
            model.isSearching = true;
            if ($window.navigator.geolocation) {
                return $window.navigator.geolocation.getCurrentPosition(requestSearchWithCoords);
            } else {
                return undefined;
            }
        }

        function searchWithAddress() {
            model.isSearching = true;
            var fullAddress = model.address.street
                + "+" + model.address.city
                + "+" + model.address.state
                + "+" + model.address.zip;
            fullAddress = fullAddress.replace(/\s/g, '+');

            MapService.searchWithAddress(fullAddress)
                .then(
                    function (res) {
                        model.isSearching = false;
                        model.places = res.results;
                    }
                );
        }

        function requestSearchWithCoords(position) {
            var currentCoords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            MapService.searchWithCoords(currentCoords)
                .then(
                    function (res) {
                        model.isSearching = false;
                        model.places = res.results;
                    }
                );
        }


    }
})();