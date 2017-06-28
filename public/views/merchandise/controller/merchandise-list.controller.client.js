(function () {
    angular
        .module('FinalProject')
        .controller('merchandiseListController', merchandiseListController);

    function merchandiseListController($location, $routeParams, merchandiseService,
                                       currentUser, userService,storeService) {
        var model = this;
        //event handler

        model.createMerchandise = createMerchandise;
        model.logout = logout;

        init();

        function init() {

            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            model.sectionTitle = "Product List";
            model.storeId = $routeParams['storeId'];
            model.merchandises = [];


            storeService
                .findStoreById(model.storeId)
                .then(function(store)
                {
                    model.canEdit = (currentUser.role === "ADMIN" ||  store._owner === currentUser._id);
                })

            merchandiseService.findMerchandiseByStoreId(model.storeId)
                .then(
                    function(merchandises){
                        model.merchandises=merchandises;
                    },
                    function(){
                        alert("cannot find merchandises for users");
                        $location.url('/store/'+model.storeId);
                    }
                );
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function createMerchandise() {
            $location.url("/store/"+model.storeId+"/merchandise/undefined/new");
        }

    }
})();