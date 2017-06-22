(function () {
    angular
        .module('FinalProject')
        .service('merchandiseService', MerchandiseService);

    function MerchandiseService($http) {

        this.createMerchandise = createMerchandise;
        this.findMerchandiseBySellerId = findMerchandiseBySellerId;
        this.findMerchandiseById = findMerchandiseById;
        this.updateMerchandise = updateMerchandise;
        this.deleteMerchandise = deleteMerchandise;

        function createMerchandise(sellerId, merchandise) {
            var url = "/api/seller/" + sellerId + "/merchandise";
            return $http.post(url,merchandise)
                .then(extractData);
        }

        function findMerchandiseBySellerId(sellerId) {
            var url = "/api/seller/" + sellerId + "/merchandise";
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
    }
})();