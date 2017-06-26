(function () {
    angular
        .module("FinalProject")
        .service("recipeService", RecipeService);

    function RecipeService($http) {

        this.createRecipe = createRecipe;
        this.findAllRecipesForCreator = findAllRecipesForCreator;
        this.findRecipeById = findRecipeById;
        this.updateRecipe = updateRecipe;
        this.deleteRecipe = deleteRecipe;
        this.findRecipeByCriteria = findRecipeByCriteria;
        this.tempYummlyIngredients = tempYummlyIngredients;
        this.getTempYummlyIngredients = getTempYummlyIngredients;
        this.createYummlyLocalRecipeCopy = createYummlyLocalRecipeCopy;
        this.findYummlyRecipeCopyByYummlyId = findYummlyRecipeCopyByYummlyId;

        this.findAllRecipes = findAllRecipes;

        var tempIngredients = {};

        function findAllRecipes() {
            var url = '/api/recipes';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findYummlyRecipeCopyByYummlyId(recipeId) {
            var url = '/api/yummly/recipeCopy/' + recipeId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createYummlyLocalRecipeCopy(recipe) {
            var url = '/api/yummly/recipeCopy';
            return $http.post(url, recipe)
                .then(function (response) {
                    return response.data;
                });
        }

        function createRecipe(userId, recipe) {
            var url = '/api/user/' + userId + '/recipe';
            return $http.post(url, recipe)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllRecipesForCreator(userId) {
            var url = '/api/user/' + userId + '/recipe';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findRecipeById(recipeId) {
            var url = '/api/recipe/' + recipeId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateRecipe(recipeId, recipe) {
            var url = '/api/recipe/' + recipeId;
            return $http.put(url, recipe)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteRecipe(recipeId) {
            var url = '/api/recipe/' + recipeId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findRecipeByCriteria(searchTerm) {
            var url = '/api/recipe?searchTerm=' + searchTerm;
            // console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function tempYummlyIngredients(ingredients) {
            tempIngredients = ingredients;
            // console.log(recipe);
        }

        function getTempYummlyIngredients() {
            return tempIngredients;
        }
    }
})();