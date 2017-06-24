(function () {
    angular
        .module('FinalProject')
        .controller('calorieController', calorieController);

    function calorieController($routeParams, userService, $location, currentUser, $rootScope) {

        var model = this;

        model.userId = currentUser.userId;
        model.updateUser = updateUser;
        model.countCalorie = countCalorie;

        function init() {
            renderUser(currentUser)
                // .error(userError());
        }
        init();

        function countCalorie(user) {
            model.calorie = 'haha';
            if (user.gender === 'male') {
                model.calorie = 66 + (6.23 * user.weight) + 12.7 * user.heigth - 6.8 * user.age;
            } else {
                model.calorie = 655 + 4.35 * user.weight + 4.7 * user.height - 4.7 * user.age;
            }
            console.log(model.calorie);
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

    }
})();

