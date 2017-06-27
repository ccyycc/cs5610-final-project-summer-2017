(function () {
    angular
        .module('FinalProject')
        .controller('merchandiseDetailController', merchandiseDetailController);

    function merchandiseDetailController($location, $routeParams, merchandiseService, associationService,
                                         currentUser, storeService, userService) {
        var model = this;
        //event handler
        model.editMerchandise = editMerchandise;

        model.createComment = createComment;
        model.deleteComment = deleteComment;
        model.likeMerchandise = likeMerchandise;
        model.unlikeMerchandise = unlikeMerchandise;
        model.logout = logout;


        init();

        function init() {

            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            model.sectionTitle = "Product Detail";
            model.storeId = $routeParams['storeId'];
            model.merchandiseId = $routeParams['merchandiseId'];

            model.comments = [];
            model.newComment = undefined;
            model.like = false;
            model.likeAssociation = {
                fromWhom: currentUser._id,
                toMerchandise: model.merchandiseId,
                type: 'LIKE'
            };





            model.merchandise = merchandiseService.findMerchandiseById(model.merchandiseId)
                .then(
                    function(merchandise){
                        model.merchandise=merchandise;

                        storeService
                            .findStoreById(model.storeId)
                            .then(function(store){
                            model.store = store;
                            model.canEdit=(store._owner===currentUser._id ||currentUser.role ==="ADMIN");
                        });


                        associationService
                            .findAssociationForTarget( "COMMENT","merchandise", model.merchandiseId)
                            .then(function (comments) {

                                model.comments = comments;
                            });
                        associationService
                            .findAssociationForSourceTarget( "LIKE",currentUser._id, "merchandise",model.merchandiseId)
                            .then(function (likes) {
                                if (likes.length === 0) {
                                    model.like = false;
                                } else {
                                    model.like = true;
                                    model.likeAssociation=likes[0];
                                }
                            })

                        associationService
                            .findAssociationForTarget("LIKE","merchandise", model.merchandiseId)
                            .then(function (likes) {
                                model.numLike = likes.length
                            })
                    },
                    function(){
                        alert("cannot find merchandise for users");
                        $location.url('/store/'+model.storeId);
                    }
                );
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }


        function editMerchandise() {
            $location.url("/store/"+model.storeId+"/merchandise/"+model.merchandiseId+"/edit");
        }

        function createComment() {
            model.newComment.fromWhom = currentUser._id;
            model.newComment.toMerchandise = model.merchandiseId;
            model.newComment.type = 'COMMENT';
            associationService
                .createAssociation(model.newComment)
                .then(function (comment) {
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
            model.newComment = {};
        }


        function likeMerchandise() {
            associationService
                .createAssociation(model.likeAssociation)
                .then(function (association) {
                    model.likeAssociation = association;
                    model.like=true;
                    model.numLike++
                })
                .then(function () {
                    currentUser.collectedProducts.push(model.merchandiseId);
                    userService
                        .updateProfile(currentUser);
                })
        }


        function unlikeMerchandise() {
            associationService
                .deleteAssociationById(model.likeAssociation._id)
                .then(function (res) {
                    model.like=false;
                    model.numLike--;
                    delete model.likeAssociation['_id'];
                })
                .then(function () {
                    var index = currentUser.collectedProducts.indexOf(model.merchandiseId);
                    currentUser.collectedProducts.splice(index, 1);
                    userService
                        .updateProfile(currentUser);
                })

        }

    }
})();