(function () {
    angular
        .module('FinalProject')
        .controller('merchandiseEditController', merchandiseEditController);

    function merchandiseEditController($location, $routeParams, merchandiseService) {
        var model = this;
        //event handler.
        model.createMerchandise = createMerchandise;
        model.updateMerchandise = updateMerchandise;
        model.deleteMerchandise = deleteMerchandise;

        init();

        function init() {
            // model.sellerId = $routeParams[''];
            //TODO REMOVE DEFAULT USERNAME
            model.storeId = $routeParams['storeId'];
            model.merchandiseId = $routeParams['merchandiseId'];
            model.mode = $routeParams['mode'];
            model.merchandiseNameStyle = "";

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

            if(model.mode === "new"){
                model.merchandise = {}
            }else{
                merchandiseService.findMerchandiseById(model.merchandiseId)
                    .then(
                        function (merchandise) {
                            model.merchandise = merchandise;
                        },
                        function () {
                            alert("cannot find merchandise with merchandise id");
                            navToMerchandise();
                        }
                    );
            }

            // merchandiseService.findMerchandiseBySellerId(model.sellerId)
            //     .then(
            //         function (merchandises) {
            //             model.merchandises = merchandises;
            //         },
            //         function () {
            //             alert("cannot find merchandises with user id");
            //             navToUser();
            //         }
            //     );
        }


        function createMerchandise() {
            model.merchandiseNameStyle = "";
            if (model.merchandise.name) {
                merchandiseService.createMerchandise(model.storeId, model.merchandise)
                    .then(navToMerchandise, function () {
                        alert("fail to create a merchandise, please try again.")
                    });
            } else {
                model.errorMessage = "merchandise name is require";
                model.merchandiseNameStyle = "has-error";
            }
        }


        function updateMerchandise() {
            model.merchandiseNameStyle = "";
            if (model.merchandise.name) {
                merchandiseService.updateMerchandise(model.merchandiseId, model.merchandise)
                    .then(navToMerchandise, error);
            } else {
                model.errorMessage = "merchandise name is require";
                model.merchandiseNameStyle = "has-error";
            }
        }

        function deleteMerchandise() {
            merchandiseService.deleteMerchandise(model.merchandiseId)
                .then(navToMerchandise, error);
        }


        function navToMerchandise() {
            $location.url("/store/" + model.storeId + "/merchandise");
        }

        function navToUser() {
            $location.url("/user");
        }

        function error() {
            alert("error, try again");
        }


    }
})();