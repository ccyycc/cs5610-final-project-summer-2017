(function () {
    angular
        .module("FinalProject")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/login", {
            })
            .when("/profile", {
                templateUrl: 'views/user/templates/profile.view.client.html'
            })
            .when("/store", {
            })
            .when('/recipe',{
            })
            .when('/store',{
                templateUrl: 'views/store/templates/store-search.view.client.html',
                controller: 'StoreSearchController',
                controllerAs: 'model'
            })
            .otherwise({redirectTo : '/'})
    }
})();
