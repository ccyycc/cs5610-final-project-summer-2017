(function () {
    angular
        .module('FinalProject')
        .service('storeService', StoreService);

    function StoreService($http) {

        this.createStore = createStore;
        this.findAllStoresForOwner = findAllStoresForOwner;
        this.findStoreById = findStoreById;
        this.updateStore = updateStore;
        this.deleteStore = deleteStore;
        this.findStoreByName = findStoreByName;

        this.findAllStores = findAllStores;

        this.findStoreByName = findStoreByName;

        function findStoreByName(storeName){
            var url = "/api/store/search/"+storeName;
            return $http.get(url)
                .then(extractData);
        }

        function createStore(ownerId, store) {
            var url = "/api/owner/" + ownerId + "/store";
            return $http.post(url, store)
                .then(extractData);
        }

        function findAllStoresForOwner(ownerId) {
            var url = "/api/owner/" + ownerId + "/store";
            return $http.get(url)
                .then(extractData);
        }

        function findAllStores() {
            var url = "/api/stores";
            return $http.get(url)
                .then(extractData);
        }

        function findStoreById(storeId) {
            var url = "/api/store/" + storeId;
            return $http.get(url)
                .then(extractData);
        }

        function findStoreByName(name) {
            var url='/api/store?name=' + name;
            return $http.get(url)
                .then(extractData);
        }

        function updateStore(storeId, store) {
            var url = "/api/store/" + storeId;
            return $http.put(url, store)
                .then(extractData);
        }

        function deleteStore(storeId) {
            var url = "/api/store/" + storeId;
            return $http.delete(url)
                .then(extractData);
        }

        function extractData(response) {
            return response.data;
        }
    }
})();