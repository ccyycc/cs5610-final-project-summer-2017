(function () {
    angular
        .module("FinalProject")
        .service("associationService", AssociationService);

    function AssociationService($http) {

        this.createLike = createLike;
        this.createComment = createComment;
        this.findAllReviewByRecipeId = findAllReviewByRecipeId;
        this.deleteRecipeLike = deleteRecipeLike;

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

        function findAllReviewByRecipeId(recipeId) {
            var url = '/api/association/comment/recipe/' + recipeId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteRecipeLike(userId, recipeId) {
            var url = '/api/association/like/from/'+ userId + '/to/' + recipeId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();