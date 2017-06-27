(function () {
    angular
        .module('FinalProject')
        .controller('userSearchController', userSearchController);

    function userSearchController($location, $routeParams, userService,currentUser) {
        var model = this;

        model.sectionTitle = "User Search";

        model.logout = logout;
        model.searchUser=searchUser ;


        init();

        function init() {

            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            var preSearch = $location.search();
            if(preSearch.search && preSearch.search.length>0){
                model.searchContent = preSearch.search;
                searchUser();
            }

        }

        function searchUser(){
            userService
                .findUserByPartialUsername(model.searchContent)
                .then(function(users){
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



    }
})();