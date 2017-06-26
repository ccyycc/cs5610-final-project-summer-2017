(function () {
    angular
        .module('FinalProject')
        .service('merchandiseService', MerchandiseService);

    function MerchandiseService($http) {

        this.createMerchandise = createMerchandise;
        this.findMerchandiseByStoreId = findMerchandiseByStoreId;
        this.findMerchandiseById = findMerchandiseById;
        this.findAllMerchandises = findAllMerchandises;
        this.updateMerchandise = updateMerchandise;
        this.deleteMerchandise = deleteMerchandise;

        function createMerchandise(storeId, merchandise) {
            var url = "/api/store/" + storeId + "/merchandise";
            return $http.post(url,merchandise)
                .then(extractData);
        }

        function findMerchandiseByStoreId(storeId) {
            var url = "/api/store/" + storeId + "/merchandise";
            return $http.get(url)
                .then(extractData);
        }

        function findMerchandiseById(merchandiseId) {
            var url = "/api/merchandise/"+merchandiseId;
            return $http.get(url)
                .then(extractData);
        }

        function updateMerchandise(merchandiseId, merchandise) {
            var url = "/api/merchandise/"+merchandiseId;
            return $http.put(url,merchandise)
                .then(extractData);
        }

        function deleteMerchandise(merchandiseId) {
            var url = "/api/merchandise/"+merchandiseId;
            return $http.delete(url)
                .then(extractData);
        }

        function extractData(response) {
            return response.data;
        }

        function findAllMerchandises() {
            var url = '/api/merchandises';
            return $http.get(url)
                .then(extractData);
        }
    }
})();