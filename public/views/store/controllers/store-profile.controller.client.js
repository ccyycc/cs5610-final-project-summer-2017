(function () {
    angular
        .module('FinalProject')
        .controller('storeProfileController', storeProfileController);

    function storeProfileController($routeParams, $location, $sce, currentUser,
                                    associationService, storeService, userService) {
        var model = this;

        //variable & route params
        model.storeId = $routeParams['storeId'];
        model.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        model.sectionTitle = "Store Profile";
        model.comments = [];
        model.newComment = undefined;
        model.like = false;
        model.likeAssociation = {
            fromWhom: currentUser._id,
            toStore: model.storeId,
            type: 'LIKE'
        };
        model.store = {};

        //event handler
        model.editStoreProfile = editStoreProfile;
        model.goToProductList = goToProductList;
        model.goToProfilePage = goToProfilePage;
        model.createComment = createComment;
        model.deleteComment = deleteComment;
        model.likeStore = likeStore;
        model.unlikeStore = unlikeStore;
        model.logout = logout;


        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }


            storeService
                .findStoreById(model.storeId)
                .then(function (res) {
                    model.store = res;
                    model.canEdit = (model.store._owner === currentUser._id || currentUser.role === "ADMIN");
                    setPermission();
                    model.store.addressUrl = trust("https://www.google.com"
                                                   + "/maps/embed/v1/place?"
                                                   + "key=AIzaSyA0oVg3fT3ZdLkEExxVyC0jkciGfmaYBcI&q="
                                                   + getStoreURLAddress(model.store));
                    model.displayAddress = getDisplayAddress(model.store);

                    userService
                        .findUserById(model.store._owner)
                        .then(function (owner) {
                            model.seller = owner;
                        });


                    associationService
                        .findAssociationForTarget("COMMENT", "store", model.storeId)
                        .then(function (comments) {
                            model.comments = comments;
                        });
                    associationService
                        .findAssociationForSourceTarget("LIKE", currentUser._id, "store", model.storeId)
                        .then(function (likes) {
                            if (likes.length === 0) {
                                model.like = false;
                            } else {
                                model.like = true;
                                model.likeAssociation = likes[0];
                            }
                        })

                    associationService
                        .findAssociationForTarget("LIKE", "store", model.storeId)
                        .then(function (likes) {
                            model.numLike = likes.length
                        })
                });

        }

        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

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
                    comment.fromWhom.username = currentUser.username;
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
                    model.numLike++;
                })
                .then(function () {
                    currentUser.likedStores.push(model.storeId);
                    userService
                        .updateProfile(currentUser);
                })
        }

        function unlikeStore() {
            associationService
                .deleteAssociationById(model.likeAssociation._id)
                .then(function (res) {
                    model.like = false;
                    model.numLike--;
                    delete model.likeAssociation['_id'];
                })
                .then(function () {
                    var index = currentUser.likedStores.indexOf(model.storeId);
                    currentUser.likedStores.splice(index, 1);
                    userService
                        .updateProfile(currentUser);
                })
        }

        function goToProductList() {
            $location.url('/store/' + model.storeId + '/merchandise');
        }

        function getDisplayAddress(store) {
            var address = store.address;
            if (address) {
                return address.street + " "
                       + address.city + " "
                       + address.state + " "
                       + address.zip;
            }
            return "";
        }

        function goToProfilePage() {
            $location.url('/profile/' + model.seller._id);

        }

        function setPermission() {
            if (currentUser.role === 'USER' || currentUser.role === 'ADMIN') {
                model.canComment = true;
                model.canLike = true;
            } else if (model.canEdit) {
                model.canComment = true;
            } else {
                model.message = "Sorry, your role can only comment on your stuff."
            }
        }


    }
})();