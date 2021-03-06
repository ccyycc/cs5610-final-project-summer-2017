(function () {
    angular
        .module('FinalProject')
        .controller('accountController', accountController);

    function accountController($routeParams, userService, $location, currentUser) {

        var model = this;

        //variable && route params
        model.userId = currentUser.userId;
        model.sectionTitle = "Account";

        //event handler
        model.updateUser = updateUser;
        model.logout = logout;
        model.unregister = unregister;

        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            renderUser(currentUser)
        }


        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function unregister(user) {
            userService
                .unregister()
                .then(function () {
                    $location.url('/');
                });
        }

        function renderUser(response) {
            model.user = response;
        }

        function updateUser(newUser) {
            userService
                .updateProfile(newUser)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }

        function userError() {
            model.error = "User not found";
        }

        // models.user = userService.findUserById(models.userId);
        // var promise = userService.findUserById(model.userId);
        //
        // promise.then(function (user) {
        //     model.user = user;
        // });
    }
})();

