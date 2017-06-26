(function () {
    angular
        .module('FinalProject')
        .controller('adminCommentsController', adminCommentsController);

    function adminCommentsController(storeService, associationService) {
        var model = this;

        model.deleteComments = deleteComments;
        model.createComments = createComments;
        model.selectComments = selectComments;
        model.updateComments = updateComments;

        function init() {

            findAllCommentss();
        }

        init();

        function updateComments(storename, association) {
            model.message = false;
            model.error = false;

            console.log('storename: ' + storename);
            storeService
                .findStoreByName(storename)
                .then(function (store) {
                    if (store === undefined) {
                        model.error = "Store does not exist";
                    } else {
                        association._creator = store._id;
                        associationService
                            .updateAssociation(association._id, association)
                            .then(findAllCommentss());
                    }
                });

        }

        function selectComments(association) {
            model.message = false;
            model.error = false;

            model.association = association;
            model.storeName = association._store.name;
        }

        function createComments(storename, association) {
            model.message = false;
            model.error = false;

            // var store = 'undefined';

            console.log('storename: ' + storename);

            storeService
                .findStoreByName(storename)
                .then(function (store) {
                    if (store === undefined) {
                        model.error = "Store does not exist";
                    } else {
                        association._creator = store.id;
                        associationService
                            .createAssociation(store._id, association)
                            .then(findAllCommentss());

                    }
                });
        }

        function deleteComments(association) {
            model.error = false;
            model.message = false;

            associationService
                .deleteAssociation(association._id)
                .then(findAllCommentss());
        }

        function findAllCommentss() {
            associationService
                .findAllAssociations()
                .then(function (associations) {
                    model.associations = associations;
                    model.association = {};
                    model.storeName = '';
                })
        }

    }

})();