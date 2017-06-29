(function () {
    angular
        .module('FinalProject')
        .controller('registerController', registerController);

    function registerController($location, userService, currentUser) {

        var model = this;

        //variable & route params
        model.sectionTitle = "Register";

        //event handler
        model.register = register;
        model.showDiscription = showDescription;

        init();

        function init() {
            if (currentUser._id) {
                $location.url('/');
            }
        }

        function register(username, password, password2, role) {

            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'username is required';
                return;
            }

            if (password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "sorry, that username is taken";
                        // return;
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password,
                            role: role
                        };
                        return userService
                            .register(newUser)
                            .then(function (user) {
                                $location.url('/profile/' + user._id);
                            });

                    }
                )
        }

        function showDescription() {
            $("#role-description").collapse('toggle');
        }
    }
})();