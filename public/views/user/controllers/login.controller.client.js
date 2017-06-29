(function () {
    angular
        .module('FinalProject')
        .controller('loginController', loginController);

    function loginController($location, userService, currentUser) {

        var model = this;

        //variable & route params
        model.sectionTitle = "Login";

        //event handler
        model.login = login;

        init();

        function init() {
            if (currentUser._id) {
                $location.url('/');
            }
        }

        function login(username, password) {
            userService
                .login(username, password)
                .then(function (found) {
                    $location.url('/');

                }, function (error) {
                    model.message = "login " + username + " unsuccessfully," +
                                    " please check the username and password and try" +
                                    " again";
                })
        }
    }
})();