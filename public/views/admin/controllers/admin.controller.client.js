(function () {
    angular
        .module('FinalProject')
        .controller('adminController', adminController);

    function adminController($location, currentUser,userService) {
        var model = this;

        //variable & route params
        model.sectionTitle = "Admin";
        model.currentUser = currentUser;

        //event handler
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