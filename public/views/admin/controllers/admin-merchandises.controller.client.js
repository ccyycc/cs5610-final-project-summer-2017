(function () {
    angular
        .module('FinalProject')
        .controller('adminMerchandisesController', adminMerchandisesController);

    function adminMerchandisesController(merchandiseService) {
        var model = this;

        model.deleteMerchandise = deleteMerchandise;
        model.createMerchandise = createMerchandise;
        model.selectMerchandise = selectMerchandise;
        model.updateMerchandise = updateMerchandise;
        // model.currentMerchandise = currentMerchandise;

        function init() {
            console.log('admin-merchandise.controller');

            findAllMerchandises();
        }

        init();

        function updateMerchandise(merchandise) {
            // console.log(merchandise);
            model.message = false;
            merchandiseService
                .updateMerchandise(merchandise._id, merchandise)
                .then(findAllMerchandises());
            model.merchandise = {};
        }

        function selectMerchandise(merchandise) {
            model.merchandise = angular.copy(merchandise);
        }

        function createMerchandise(merchandise) {
            merchandiseService
                .createMerchandise(merchandise)
                .then(function () {
                    model.message = "The default password is 'password'";
                })
                .then(findAllMerchandises());
        }
        function deleteMerchandise(merchandise) {
            model.message = false;
            merchandiseService
                .deleteMerchandise(merchandise._id)
                .then(findAllMerchandises());
        }

        function findAllMerchandises() {
            merchandiseService
                .findAllMerchandises()
                .then(function (merchandises) {
                    model.merchandises = merchandises;
                })
        }


    }

})();