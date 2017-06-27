(function () {
    angular
        .module('FinalProject')
        .controller('adminController', adminController);

    function adminController($location,currentUser) {
        var model = this;

        model.sectionTitle = "Admin";
        model.currentUser = currentUser;

        model.logout = logout;

        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
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