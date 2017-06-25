(function () {
    angular
        .module('FinalProject')
        .controller('merchandiseDetailController', merchandiseDetailController);

    function merchandiseDetailController($location, $routeParams, merchandiseService) {
        var model = this;
        //event handler
        model.editMerchandise = editMerchandise;

        init();

        function init() {
            model.sectionPage = "Product Detail";
            model.storeId = $routeParams['storeId'];
            model.merchandiseId = $routeParams['merchandiseId'];
            
            
            model.merchandise = merchandiseService.findMerchandiseById(model.merchandiseId)
                .then(
                    function(merchandise){
                        model.merchandise=merchandise;
                    },
                    function(){
                        alert("cannot find merchandise for users");
                        $location.url('/store/'+model.storeId);
                    }
                );
        }

        function editMerchandise() {
            $location.url("/store/"+model.storeId+"/merchandise/"+model.merchandiseId+"/edit");
        }

    }
})();