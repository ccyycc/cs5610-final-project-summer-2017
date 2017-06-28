(function () {
    angular
        .module('FinalProject')
        .controller('photoController', photoController);

    function photoController($routeParams, $location, currentUser) {
        var model = this;
        model.sectionTitle = "Photo";
        model.user = currentUser;
        model.userId = currentUser._id;

        model.logout = logout;

        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
        }


        // models.uploadPhoto = uploadPhoto;
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
    }
})();