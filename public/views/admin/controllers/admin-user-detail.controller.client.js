(function () {
    angular
        .module('FinalProject')
        .controller('adminUserDetailController', adminUserDetailController);

    function adminUserDetailController(userService, $routeParams, $location) {
        var model = this;

        model.updateUser = updateUser;
        model.userId = $routeParams.userId;

        function init() {
            findUserById();
        }
        init();

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