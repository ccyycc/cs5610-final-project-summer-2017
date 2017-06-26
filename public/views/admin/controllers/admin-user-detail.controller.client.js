(function () {
    angular
        .module('FinalProject')
        .controller('adminUserDetailController', adminUserDetailController);

    function adminUserDetailController(userService, $routeParams, $location) {
        var model = this;

        model.updateUser = updateUser;
        model.userId = $routeParams.userId;
        // model.currentUser = currentUser;

        function init() {
            findUserById();
        }
        init();

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function (user) {
                    model.user = user;
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