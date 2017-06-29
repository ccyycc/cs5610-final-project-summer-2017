(function () {
    angular
        .module('FinalProject')
        .controller('calorieController', calorieController);

    function calorieController($routeParams, userService, $location, currentUser, $rootScope) {

        var model = this;

        model.updateUser = updateUser;
        model.countCalorie = countCalorie;
        model.logout = logout;

        model.sectionTitle = "BMI Calculator";
        model.userId = currentUser.userId;

        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
            renderUser(currentUser)
        }


        function countCalorie(user) {

            var figure = {};
            figure.height = user.height;
            figure.weight = user.weight;
            figure.gender = user.gender.charAt(0);
            figure.age = user.age;

            userService
                .countBmi(figure)
                .then(function (response) {
                    model.bmi = response.body;
                    model.calorie = model.bmi.bmr.value;
                })
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

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

    }
})();

