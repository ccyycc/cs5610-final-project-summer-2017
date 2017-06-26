(function () {
    angular
        .module('FinalProject')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController(userService) {
        var model = this;

        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        // model.currentUser = currentUser;

        function init() {
            console.log('admin-user.controller');

            findAllUsers();
        }

        init();

        function updateUser(user) {
            // console.log(user);
            model.message = false;
            userService
                .updateUser(user._id, user)
                .then(findAllUsers())
                .then(model.user = {});
        }

        function selectUser(user) {
            model.user = angular.copy(user);
        }


        function createUser(user) {
            userService
                .createUser(user)
                .then(function () {
                    model.message = "The default password is 'password'";
                })
                .then(findAllUsers())
                .then(model.user = {});
        }

        function deleteUser(user) {
            model.message = false;
            userService
                .deleteUser(user._id)
                .then(findAllUsers());
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                })
        }


    }

})();