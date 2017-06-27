(function () {
    angular
        .module('FinalProject')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;
        model.sectionTitle = "Register";
        model.register = register;
        model.showDiscription = showDescription;

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
                                $location.url('/profile/'+user._id);
                            });

                    }
                )

        }

        function showDescription() {
            // if (!model.discription) {
            //     model.discription = 'show';
            // } else {
            //     model.discription = false;
            // }
            $("#role-description").collapse('toggle');
        }
    }
})();