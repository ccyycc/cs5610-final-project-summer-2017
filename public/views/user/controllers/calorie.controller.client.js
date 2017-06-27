(function () {
    angular
        .module('FinalProject')
        .controller('calorieController', calorieController);

    function calorieController($routeParams, userService, $location, currentUser, $rootScope) {

        var model = this;

        model.sectionTitle = "BMI Calculator";
        model.userId = currentUser.userId;

        model.updateUser = updateUser;
        model.countCalorie = countCalorie;
        model.logout = logout;

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
            renderUser(currentUser)
        }

        init();

        function countCalorie(user) {
            // model.calorie = 'haha';
            // if (user.gender === 'male') {
            //     model.calorie = 66 + 6.23 * user.weight + 12.7 * user.height - 6.8 * user.age;
            // } else {
            //     model.calorie = 655 + 4.35 * user.weight + 4.7 * user.height - 4.7 * user.age;
            // }
            // console.log(model.calorie);

            var figure = {};
            figure.height = user.height;
            figure.weight = user.weight;
            figure.gender = user.gender.charAt(0);
            figure.age = user.age;
            console.log(figure);

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

