(function () {
    angular
        .module('FinalProject')
        .controller('userSearchController', userSearchController);

    function userSearchController($location, $routeParams, userService, currentUser) {
        var model = this;

        //variable & route params
        model.sectionTitle = "User Search";

        //event handler
        model.logout = logout;
        model.searchUser = searchUser;
        model.navToUserProfile = navToUserProfile;

        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            var preSearch = $location.search();
            if (preSearch.search && preSearch.search.length > 0) {
                model.searchContent = preSearch.search;
                searchUser();
            }
        }

        function searchUser() {
            userService
                .findUserByPartialUsername(model.searchContent)
                .then(function (users) {
                    model.users = users
                })

        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function navToUserProfile(user) {
            if (model.ifLoggedIn) {
                $location.url("/profile/" + user._id);
            } else {
                alert('Please log in first.');
                $location.url("/login");
            }
        }

    }
})();