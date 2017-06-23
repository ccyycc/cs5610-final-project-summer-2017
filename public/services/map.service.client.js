(function () {
    angular
        .module('FinalProject')
        .service('MapService', mapService);

    function mapService($http) {

        this.searchOnMap = search;

        function search(coords) {
            var url = "/api/map";
            return $http.post(url,coords)
                .then(extractData);
        }

        function extractData(response) {
            return response.data;
        }
    }
})();