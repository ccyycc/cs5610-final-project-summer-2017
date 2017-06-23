(function () {
    angular
        .module("FinalProject")
        .service("commentService", CommentService);

    function CommentService($http) {

        this.createComment = createComment;
        this.findAllRecipeReview = findAllRecipeReview;


        function createComment(comment) {
            var url = '/api/comment';
            return $http.post(url, comment)
                .then(function (response) {
                    return response.data;
                });
        }
        function findAllRecipeReview(recipeId) {
            var url = '/api/comment/recipe_review/' + recipeId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();