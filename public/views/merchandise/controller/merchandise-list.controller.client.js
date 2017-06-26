(function () {
    angular
        .module('FinalProject')
        .controller('merchandiseListController', merchandiseListController);

    function merchandiseListController($location, $routeParams, merchandiseService,currentUser) {
        var model = this;
        //event handler

        model.createMerchandise = createMerchandise;

        init();

        function init() {
            model.sectionTitle = "Product List";
            model.storeId = $routeParams['storeId'];
            model.merchandises = [];
            model.merchandises = merchandiseService.findMerchandiseByStoreId(model.storeId)
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

        function createMerchandise() {
            $location.url("/store/"+model.storeId+"/merchandise/undefined/new");
        }

    }
})();