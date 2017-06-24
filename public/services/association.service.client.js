(function () {
    angular
        .module("FinalProject")
        .service("associationService", AssociationService);

    function AssociationService($http) {

        this.createLike = createLike;
        this.createComment = createComment;
        this.findAllRecipeReview = findAllRecipeReview;
        this.deleteRecipeLike = deleteRecipeLike;
        this.findLikeForRecipe = findLikeForRecipe;

        function createLike(like) {
            var url = '/api/association/like';
            return $http.post(url, like)
                .then(function (response) {
                    return response.data;
                })
        }

        function createComment(comment) {
            var url = '/api/association/comment';
            // console.log(comment);
            return $http.post(url, comment)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllRecipeReview(recipeId) {
            var url = '/api/association/comment/recipe/' + recipeId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteRecipeLike(likeId) {
            var url = '/api/association/like/' + likeId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findLikeForRecipe(userId, recipeId) {
            var url = '/api/association/like/from/'+ userId + '/to/' + recipeId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();