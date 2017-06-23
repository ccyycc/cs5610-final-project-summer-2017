(function () {
    angular
        .module('FinalProject')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {
            // var found = userService.findUserByCredentials(username, password);
            userService
                .login(username, password)
                .then(function (found) {
                    $location.url('/profile');

                }, function (error) {
                    model.message = "login " + username + " unsuccessfully," +
                        " please check the username and password and try" +
                        " again";
                })
        }
    }
})();