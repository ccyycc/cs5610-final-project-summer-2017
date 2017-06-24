(function () {
    angular
        .module("FinalProject")
        .controller("homeController", homeController);

    function homeController(userService,$location, $route, yummlyService,currentUser) {

        var model = this;
        model.logout = logout;

        init();
        function init() {
            model.currentUser = currentUser;
            // // model.windowWidth
            // var w = angular.element($window);
            // w.bind('resize', function () {
            //    model.windowWidth = w[0].innerWidth;
            // });
        }
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();
