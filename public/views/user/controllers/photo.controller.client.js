(function () {
    angular
        .module('FinalProject')
        .controller('photoController', photoController);

    function photoController($routeParams, $location, currentUser) {
        var model = this;

        //variable and route params
        model.user = currentUser;
        model.userId = currentUser._id;
        model.sectionTitle = "Photo";

        //event handler
        model.logout = logout;

        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
    }
})();