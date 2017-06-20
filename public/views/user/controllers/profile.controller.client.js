(function () {
    angular
        .module('FinalProject')
        .controller('profileController', profileController);

    function profileController($routeParams, userService, $location, currentUser, $rootScope) {

        var model = this;

        model.userId = currentUser.userId;
        model.updateUser = updateUser;
        // model.deleteUser = deleteUser;
        model.logout = logout;
        model.unregister = unregister;

        function init() {
            renderUser(currentUser)
                // .error(userError());
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $rootScope.currentUser = null;
                    $location.url('/login');
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

        // model.user = userService.findUserById(model.userId);
        var promise = userService.findUserById(model.userId);

        promise.then(function (user) {
            model.user = user;
        });
    }
})();

