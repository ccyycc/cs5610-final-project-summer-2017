(function () {
    angular
        .module('FinalProject')
        .controller('merchandiseListController', merchandiseListController);

    function merchandiseListController($location, $routeParams, merchandiseService) {
        var model = this;
        //event handler
        model.newMerchandise = newMerchandise;

        init();

        function init() {
            // model.sellerId = currentUser._id;
            model.sellerId = $routeParams['sellerId'];
            //TODO REMOVE DEFAULT USERNAME
            model.sellerId ="123";

            // model.sellerId = $routeParams['wid'];
            model.merchandises = merchandiseService.findMerchandiseBySellerId(model.sellerId)
                .then(
                    function(merchandises){
                        model.merchandises=merchandises;
                    },
                    function(){
                        alert("cannot find merchandises for users");
                        $location.url('/user');
                    }
                );

            //header
            model.header = "Merchandise List";
            model.back = "#!/user/";
            model.topRightOperationIcon = 'glyphicon glyphicon-plus';
            model.topRightOperation = model.newMerchandise;
        }

        function newMerchandise() {
            $location.url('/user/' + model.sellerId + "/merchandise/new");
        }

    }
})();