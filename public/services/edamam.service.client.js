(function () {
    angular
        .module("FinalProject")
        .service("edamamService", EdamamService);

    function EdamamService($http) {

        this.getIngredientDetail = getIngredientDetail;

        var id = 'b055d0b1';
        var key = 'cc8625e0f7fa16f6e88820fcffac47ec';

        var urlBase = 'https://api.edamam.com/api/nutrition-data?app_id=app-id' +
            '&app_key=app-key&ingr=ingredient-name';

        function getIngredientDetail(searchTerm) {
            var url = urlBase
                .replace("app-id", id)
                .replace("app-key", key)
                .replace("ingredient-name", 'a%20'+searchTerm)
                .replace(" ", '%20');
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

    }
})();
