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

        function countCalorie() {
            
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

