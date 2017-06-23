(function () {
    angular
        .module("FinalProject")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: './views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: './views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/account', {
                templateUrl: './views/user/templates/account.view.client.html',
                controller: 'accountController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedin
                }
            })
            .when('/account/photo', {
                templateUrl: './views/user/templates/snippets/photo.view.client.html',
                controller: 'photoController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedin
                }
            })
            .when('/profile', {
                templateUrl: './views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedin
                }
            })
            .when("/recipe_list", {
                templateUrl: "views/recipe/templates/recipe-list.view.client.html",
                controller: "recipeListController",
                controllerAs: "model"
                //TODO:no need to log in to view this page
            })
            .when('/recipe_list/:recipeId', {
                //TODO: permission?
                templateUrl: 'views/recipe/templates/otherUser/recipe-detail.view.client.html',
                controller: 'recipeDetailController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedin
                }
            })
            .when('/recipe_list/:recipeId/ingredient/:ingredientName', {
                templateUrl: 'views/recipe/templates/otherUser/ingredient-detail.view.client.html',
                controller: 'ingredientDetailController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedin
                }
            })
            //TODO: could be the profile page of recipe provider
            .when('/recipe',{
                templateUrl: 'views/recipe/templates/creator/recipe-list-by-creator.view.client.html',
                controller: 'recipeListByCreatorController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedin
                }
            })
            .when('/recipe/:recipeId', {
                templateUrl: 'views/recipe/templates/creator/recipe-edit.view.client.html',
                controller: 'recipeEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedin
                }
            })
            .when("/store", {
            })
            .otherwise({redirectTo : '/'})
    }

    function checkLoggedin(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .loggedin()
            .then(function (user) {
                if (user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

})();

