(function () {
    angular
        .module('FinalProject')
        .controller('userSearchController', userSearchController);

    function userSearchController($location, $routeParams, userService) {
        var model = this;
        //event handler

        model.searchUser=searchUser ;
        init();

        function init() {
            model.sectionTitle = "User Search";

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



    }
})();