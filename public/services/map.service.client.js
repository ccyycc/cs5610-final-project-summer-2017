(function () {
    angular
        .module('FinalProject')
        .service('MapService', mapService);

    function mapService($http) {

        this.searchWithCoords = searchWithCoords;
        this.searchWithAddress = searchWithAddress;


        function searchWithAddress(address) {
            var url = "/api/map/searchWithAddress/" + address;
            return $http.get(url)
                .then(extractData);
        }

        function searchWithCoords(coords) {
            var url = "/api/map/searchWithCoords";
            return $http.post(url, coords)
                .then(extractData);
        }

        function extractData(response) {
            return response.data;
        }
    }
})();