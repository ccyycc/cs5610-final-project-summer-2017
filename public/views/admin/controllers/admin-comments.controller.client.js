(function () {
    angular
        .module('FinalProject')
        .controller('adminCommentsController', adminCommentsController);

    function adminCommentsController($location,
                                     associationService,
                                     userService,
                                     storeService,
                                     recipeService,
                                     merchandiseService,
                                     currentUser) {
        var model = this;

        model.sectionTitle = "Manage Comments";

        model.deleteComment = deleteComment;
        model.createComment = createComment;
        model.selectComment = selectComment;
        model.updateComment = updateComment;
        model.logout = logout;

        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }
            findAllComments();
            model.types = ['Recipe', 'Store', 'Merchandise']
        }


        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function findObjById(id, type) {
            if (type === 'Recipe') {
                return recipeService
                    .findRecipeById(id)
                    .then(function (data) {
                        model.obj = data;
                    })
            } else if (type === 'Store') {
                return storeService
                    .findStoreById(id)
                    .then(function (data) {
                        model.obj = data;
                    });
            } else if (type === 'Merchandise') {
                return merchandiseService
                    .findMerchandiseById(id)
                    .then(function (data) {
                        // console.log(data);
                        model.obj = data;
                    });
            }
        }

        function updateComment(fromName, toType, comment) {
            model.message = false;
            model.error = false;

            var id = comment.toId;

            userService.findUserByUsername(fromName)
                .then(function (user) {
                    if (user === undefined) {
                        model.error = 'User ' + fromName + ' not find';
                        return;
                    } else {
                        if (toType === 'Recipe') {
                            return recipeService
                                .findRecipeById(id)
                                .then(function (data) {
                                    checkData(data, user)
                                })
                        } else if (toType === 'Store') {
                            return storeService
                                .findStoreById(id)
                                .then(function (data) {
                                    checkData(data, user)
                                });
                        } else if (toType === 'Merchandise') {
                            return merchandiseService
                                .findMerchandiseById(id)
                                .then(function (data) {
                                    checkData(data, user)
                                });
                        }
                    }
                });

            function checkData(data, fromWhom) {
                if (data === undefined) {
                    model.error = toType + ' ' + comment.toId + ' not find';
                    return;
                } else {
                    delete comment.toRecipe;
                    delete comment.toStore;
                    delete comment.toMerchandise;
                    comment['to' + toType] = comment.toId;

                    comment.fromWhom = fromWhom._id;
                    comment.time = Date.now();

                    delete comment.toId;
                    delete comment.toType;

                    // if (comment.toId === comment.to)
                    console.log(comment);
                    associationService
                        .updateAssociation(comment._id, comment)
                        .then(findAllComments());
                }
            }

        }

        function selectComment(comment) {
            model.message = "'To' field only accept objcet Id";
            model.error = false;

            // model.comment = {};
            model.comment = angular.copy(comment);
            model.fromName = comment.fromWhom.username;
            model.toType = comment.toType;
        }

        function createComment(fromName, toType, comment) {
            model.message = false;
            model.error = false;

            var id = comment.toId;

            userService.findUserByUsername(fromName)
                .then(function (user) {
                    if (user === undefined) {
                        model.error = 'User ' + fromName + ' not find';
                        return;
                    } else {
                        if (toType === 'Recipe') {
                            return recipeService
                                .findRecipeById(id)
                                .then(function (data) {
                                    createData(data, user)
                                })
                        } else if (toType === 'Store') {
                            return storeService
                                .findStoreById(id)
                                .then(function (data) {
                                    createData(data, user)
                                });
                        } else if (toType === 'Merchandise') {
                            return merchandiseService
                                .findMerchandiseById(id)
                                .then(function (data) {
                                    createData(data, user)
                                });
                        }
                    }
                });

            function createData(data, fromWhom) {
                if (data === undefined) {
                    model.error = toType + ' ' + comment.toId + ' not find';
                    return;
                } else {
                    comment['to' + toType] = comment.toId;

                    comment.fromWhom = fromWhom._id;
                    comment.time = Date.now();
                    comment.type = 'COMMENT';

                    delete comment.toId;
                    delete comment.toType;
                    delete comment._id;

                    // if (comment.toId === comment.to)
                    console.log(comment);
                    associationService
                        .createAssociation(comment)
                        .then(findAllComments());
                }
            }

        }

        function deleteComment(association) {
            model.error = false;
            model.message = false;

            associationService
                .deleteComment(association._id)
                .then(findAllComments());
        }

        function findAllComments() {
            associationService
                .findAllComments()
                .then(function (comments) {
                    console.log(comments);
                    for (var c = 0; c < comments.length; c++) {
                        if (comments[c].toRecipe !== undefined) {
                            comments[c].toName = comments[c].toRecipe.name;
                            comments[c].toId = comments[c].toRecipe._id;
                            comments[c].toType = 'Recipe';
                        } else if (comments[c].toStore !== undefined) {
                            comments[c].toName = comments[c].toStore.name;
                            comments[c].toId = comments[c].toStore._id;
                            comments[c].toType = 'Store';
                        } else if (comments[c].toMerchandise !== undefined) {
                            comments[c].toName = comments[c].toMerchandise.name;
                            comments[c].toId = comments[c].toMerchandise._id;
                            comments[c].toType = 'Merchandise';
                        }
                    }
                    model.comments = comments;

                    model.fromName = '';
                    model.comment = {};
                    model.toType = '';
                    model.toId = '';

                })
        }

    }

})();