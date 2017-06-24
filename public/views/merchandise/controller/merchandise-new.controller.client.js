(function () {
    angular
        .module('FinalProject')
        .controller('merchandiseNewController', merchandiseNewController);

    function merchandiseNewController($location, $routeParams, merchandiseService) {
        var model = this;
        //event handler
        model.createNewMerchandise = createNewMerchandise;

        init();

        function init() {
            model.sectionPage = "New Product";
            model.merchandise = {};

            // model.sellerId = currentUser._id;
            model.sellerId = $routeParams['sellerId'];
            //TODO REMOVE DEFAULT USERNAME
            model.sellerId ="123";

            model.merchandiseNameStyle = "";

            merchandiseService.findMerchandiseBySellerId(model.sellerId)
                .then(
                    function (merchandises) {
                        model.merchandises = merchandises;
                    },
                    function () {
                        alert("cannot find merchandises with user id");
                        // navToUser();

                    }
                );

            //header
            //left panel
            model.leftHeader = "Merchandise List";
            model.leftBack = "#!/user/" + model.sellerId + "/merchandise";
            // model.leftTopRightOperationIcon = 'glyphicon glyphicon-plus';
            // model.leftTopRightOperation = newMerchandise;

            //right panel
            model.rightHeader = "New merchandise ";
            model.rightBack = "#!/user/" + model.sellerId + "/merchandise";
            model.rightTopRightOperationIcon = 'glyphicon glyphicon-ok';
            model.rightTopRightOperation = model.createNewMerchandise;
        }

        function createNewMerchandise() {
            model.merchandiseNameStyle = "";
            if (model.merchandise.name) {
                model.merchandise._seller = model.sellerId;
                merchandiseService.createMerchandise(model.sellerId, model.merchandise)
                    .then(navToMerchandise, function () {
                        alert("fail to create a merchandise, please try again.")
                    });
            } else {
                model.errorMessage = "merchandise name is require";
                model.merchandiseNameStyle = "has-error";
            }
        }

        function navToUser() {
            $location.url("/user/");
        }

        function navToMerchandise() {
            $location.url("/merchandise/");
        }
    }
})();