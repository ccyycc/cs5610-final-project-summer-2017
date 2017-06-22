(function () {
    angular
        .module('FinalProject')
        .controller('merchandiseEditController', merchandiseEditController);

    function merchandiseEditController($location, $routeParams, merchandiseService) {
        var model = this;
        //event handler.
        model.updateMerchandise = updateMerchandise;
        model.deleteMerchandise = deleteMerchandise;

        init();

        function init() {
            model.sellerId = $routeParams['sellerId'];
            //TODO REMOVE DEFAULT USERNAME
            model.sellerId ="123";

            model.merchandiseNameStyle = "";
            merchandiseService.findMerchandiseByUserId(model.sellerId)
                .then(
                    function (merchandises) {
                        model.merchandises = merchandises;
                    },
                    function () {
                        alert("cannot find merchandises with user id");
                        navToUser();
                    }
                );
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

            //header
            //left panel
            model.leftHeader = "Merchandise List";
            model.leftBack = "#!/user/" + model.sellerId + "/merchandise";

            //right panel
            model.rightHeader = "Edit merchandise ";
            model.rightBack = "#!/user/" + model.sellerId + "/merchandise";
            model.rightTopRightOperationIcon = 'glyphicon glyphicon-ok';
            model.rightTopRightOperation = updateMerchandise;
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
            $location.url("/user/" + model.sellerId + "/merchandise");
        }

        function navToUser() {
            $location.url("/user");
        }

        function error() {
            alert("error, try again");
        }


    }
})();