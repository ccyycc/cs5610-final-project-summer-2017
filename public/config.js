(function () {
    angular
        .module("FinalProject")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'./views/home/templates/home.view.client.html',
                // controller:''
            })
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
            .when('/store/:storeId/merchandise',{
                templateUrl: './views/merchandise/templates/merchandise-list.view.client.html',
                controller: 'merchandiseListController',
                controllerAs: 'model'
            })
            .when('/store/:storeId/merchandise/:merchandiseId/:mode',{
                templateUrl: './views/merchandise/templates/merchandise-edit.view.client.html',
                controller: 'merchandiseEditController',
                controllerAs: 'model'
            })

            .when('/recipe',{
            })
            .when('/store/:storeId',{
                templateUrl: 'views/store/templates/store-profile.view.client.html',
                controller: 'storeProfileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedin
                }
            })
            .when('/store/:storeId/:mode',{
                templateUrl: 'views/store/templates/store-profile-edit.view.client.html',
                controller: 'storeProfileEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedin
                }
            })


            .when('/store-search',{
                templateUrl: 'views/store/templates/store-search.view.client.html',
                controller: 'StoreSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedin
                }
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
