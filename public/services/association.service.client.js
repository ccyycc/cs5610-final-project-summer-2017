(function () {
    angular
        .module("FinalProject")
        .service("associationService", AssociationService);

    function AssociationService($http) {

        this.createRecipeReview = createRecipeReview;
        this.findAllRecipeReview = findAllRecipeReview;


        function createRecipeReview(userId, recipeId, comment) {
            var url = '/api/from/'+ userId + '/to/' + recipeId + '/association';
            console.log(comment);
            return $http.post(url, comment)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllRecipeReview(recipeId) {
            var url = '/api/association/recipe_review/' + recipeId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();