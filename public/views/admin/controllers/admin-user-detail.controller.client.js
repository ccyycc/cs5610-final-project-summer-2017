(function () {
    angular
        .module('FinalProject')
        .controller('adminUserDetailController', adminUserDetailController);

    function adminUserDetailController($location,userService, $routeParams, $location, currentUser) {
        var model = this;

        model.sectionTitle = "Manage User Detail";
        model.userId = $routeParams.userId;

        model.logout = logout;
        model.updateUser = updateUser;


        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
            model.roles = ['USER', 'ADMIN', 'RECIPEPRO', 'MERCHANT']
            findUserById();
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function (user) {
                    $location.url('/admin/users');
                });
        }


        function findUserById() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    model.user = user;
                })
        }

    }

})();