(function () {
    angular
        .module('FinalProject')
        .controller('StoreSearchController', storeSearchController);

    function storeSearchController($routeParams, $location, MapService, $window) {
        var model = this;


        function getLocation() {
            if ($window.navigator.geolocation) {
                $window.navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            var currentLocation = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            MapService.searchOnMap(currentLocation).then(
                function (res) {
                    model.places = res.results;
                }
            );
            model.tmpLocation = position;
        }


        function init() {
            getLocation();

        }

        init();
    }
})();