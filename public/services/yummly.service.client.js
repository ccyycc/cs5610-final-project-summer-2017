(function () {
    angular
        .module("FinalProject")
        .service("yummlyService", YummlyService);

    function YummlyService($http) {

        this.searchRecipes = searchRecipes;
        this.detailRecipe = detailRecipe;

        var id = 'ef65e9c2';
        var key = 'efd5ede00f6c4b4f7fd8e210a4529a9a';

        var urlBase = 'https://api.yummly.com/v1/api/recipes?_app_id=app-id&_app_key=app-key&q=your_search_parameters' +
            '&maxResult=12&start=start_index';
        // '&callback=package';


        function searchRecipes(searchTerm, index) {
            var url = urlBase
                .replace("app-id", id)
                .replace("app-key", key)
                .replace("your_search_parameters", searchTerm)
                .replace("start_index", index * 12);
            return $http.get(url)
                .then(function (response) {
                    return response.data.matches;
                })
        }

        function detailRecipe(recipeId) {
            // console.log(recipeId);
            // console.log(id);
            // console.log(key);
            // var url = 'http://api.yummly.com/v1/api/recipe/recipe-id?_app_id=app-id&_app_key=app-key';
            var url = 'https://api.yummly.com/v1/api/recipe/recipe-id?_app_id=app-id&_app_key=app-key'
                .replace("recipe-id", recipeId)
                .replace("app-id", id)
                .replace("app-key", key);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }
    }

})();

