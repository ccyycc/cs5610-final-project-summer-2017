(function () {
    angular
        .module('FinalProject')
        .controller('storeProfileController', storeProfileController);

    function storeProfileController($routeParams, $location, $sce, currentUser,
                                    associationService, storeService, userService) {
        var model = this;

        model.editStoreProfile = editStoreProfile;
        model.goToProductList = goToProductList;

        model.createComment = createComment;
        model.deleteComment = deleteComment;
        model.likeStore = likeStore;
        model.unlikeStore = unlikeStore;

        function init() {
            //setup
            model.storeId = $routeParams['storeId'];

            model.comments = [];
            model.newComment = undefined;
            model.like = false;
            model.likeAssociation = {
                fromWhom: currentUser._id,
                toStore: model.storeId,
                type: 'LIKE'
            };

            model.sectionTitle = "Store Profile";

            model.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

            model.store = {};

            storeService
                .findStoreById(model.storeId)
                .then(function (res) {
                    model.store = res;
                    model.canEdit = (model.store._owner === currentUser._id);

                    model.store.addressUrl = trust("https://www.google.com"
                                                   + "/maps/embed/v1/place?"
                                                   + "key=AIzaSyA0oVg3fT3ZdLkEExxVyC0jkciGfmaYBcI&q="
                                                   + getStoreURLAddress(model.store));

                    userService
                        .findUserById(model.store._owner)
                        .then(function(owner){
                            console.log(model.store);
                            console.log("user")
                            console.log(owner)
                            model.seller = owner;
                        });


                    associationService
                        .findAssociationForTarget("COMMENT", "store", model.storeId)
                        .then(function (comments) {
                            console.log('comments');
                            console.log(comments);
                            model.comments = comments;
                        });
                    associationService
                        .findAssociationForSourceTarget("LIKE", currentUser._id, "store", model.storeId)
                        .then(function (likes) {
                            console.log(likes);
                            if (likes.length === 0) {
                                model.like = false;
                            } else {
                                model.like = true;
                                model.likeAssociation = likes[0];
                            }
                        })
                });

        }

        init();

        function getStoreURLAddress(store) {
            var address = store.address;
            if (address) {
                return address.street + "+"
                       + address.city + "+"
                       + address.state + "+"
                       + address.zip;
            }
            return "";
        }

        function editStoreProfile() {
            $location.url('/store/' + model.storeId + '/edit');
        }

        function trust(url) {
            return $sce.trustAsResourceUrl(url);
        }


        function createComment() {
            model.newComment.fromWhom = currentUser._id;
            model.newComment.toStore = model.storeId;
            model.newComment.type = 'COMMENT';
            associationService
                .createAssociation(model.newComment)
                .then(function (comment) {
                    comment.fromWhom = {};
                    comment.fromWhom.username=currentUser.username;
                    model.comments.push(comment);
                    model.newComment = undefined;
                });
        }

        function deleteComment(comment) {
            associationService
                .deleteAssociationById(comment._id)
                .then(function (res) {
                    var index = model.comments.indexOf(comment);
                    model.comments.splice(index, 1);
                });
            model.newComment = undefined;
        }


        function likeStore() {
            console.log(model.likeAssociation);
            associationService
                .createAssociation(model.likeAssociation)
                .then(function (association) {
                    model.likeAssociation = association;
                    model.like = true;
                });
        }

        function unlikeStore() {
            associationService
                .deleteAssociationById(model.likeAssociation._id)
                .then(function (res) {
                    model.like = false;
                    delete model.likeAssociation['_id'];
                });
        }

        function goToProductList() {
            $location.url('/store/' + model.storeId + '/merchandise');
        }


    }
})();