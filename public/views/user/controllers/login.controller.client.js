(function () {
    angular
        .module('FinalProject')
        .controller('loginController', loginController);

    function loginController($location, userService,currentUser) {

        var model = this;

        model.sectionTitle = "Login";
        model.login = login;

        init()
        function init() {

            if(currentUser._id){
                console.log(currentUser._id)
                $location.url('/');
            }
        }
        function login(username, password) {
            // var found = userService.findUserByCredentials(username, password);
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