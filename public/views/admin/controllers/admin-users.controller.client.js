(function () {
    angular
        .module('FinalProject')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController($location,userService,currentUser) {
        var model = this;

        model.sectionTitle = "Manage User";

        model.deleteUser = deleteUser;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        // model.currentUser = currentUser;
        model.logout = logout;

        init();

        function init() {
            model.roles = ['USER', 'ADMIN', 'RECIPEPRO', 'MERCHANT']
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
            findAllUsers();
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

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