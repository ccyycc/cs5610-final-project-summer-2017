(function () {
    angular
        .module('FinalProject')
        .controller('adminMerchandisesController', adminMerchandisesController);

    function adminMerchandisesController(storeService, merchandiseService) {
        var model = this;

        model.deleteMerchandise = deleteMerchandise;
        model.createMerchandise = createMerchandise;
        model.selectMerchandise = selectMerchandise;
        model.updateMerchandise = updateMerchandise;

        function init() {

            findAllMerchandises();
        }

        init();

        function updateMerchandise(storename, merchandise) {
            model.message = false;
            model.error = false;

            console.log('storename: ' + storename);
            storeService
                .findUserByUsername(storename)
                .then(function (user) {
                    if (user === undefined) {
                        model.error = "Username does not exist";
                    } else if (user.role !== 'RECIPEPRO') {
                        model.error = 'User is not a merchandise provider';
                    }else {
                        var merchandiseId = merchandise._id;
                        merchandise._creator = user._id;
                        merchandiseService
                            .updateMerchandise(merchandiseId, merchandise)
                            .then(findAllMerchandises());

                        model.merchandise = {};
                        model.storename = '';
                    }
                });

        }

        function selectMerchandise(merchandise) {
            model.message = false;
            model.error = false;

            model.merchandise = angular.copy(merchandise);
            if (merchandise._creator !== undefined) {
                model.storename = merchandise._creator.storename;
            }
        }

        function createMerchandise(storename, merchandise) {
            model.message = false;
            model.error = false;

            // var user = 'undefined';

            console.log('storename: ' + storename);

            storeService
                .findUserByUsername(storename)
                .then(function (user) {
                    if (user === undefined) {
                        model.error = "Username does not exist";
                    } else if (user.role !== 'RECIPEPRO') {
                        model.error = 'User is not a merchandise provider';
                    } else {
                        merchandise._creator = user.id;


                        merchandiseService
                            .createMerchandise(user._id, merchandise)
                            .then(findAllMerchandises());

                        model.merchandise = {};
                        model.storename = '';
                    }
                });
        }

        function deleteMerchandise(merchandise) {
            model.error = false;
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