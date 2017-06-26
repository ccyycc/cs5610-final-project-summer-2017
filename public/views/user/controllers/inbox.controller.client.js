(function () {
    angular
        .module('FinalProject')
        .controller('inboxController', inboxController);

    function inboxController($routeParams, userService, $location, currentUser) {

        var model = this;
        model.userId = currentUser.userId;

        model.renderMessage = renderMessage;
        model.deleteMessage = deleteMessage;


        function init() {
            renderUser(currentUser)
                // .error(userError());
        }
        init();

        function renderMessage() {
            userService
                .populateArr(model.userId, 'messages')
                .then(function (messages) {
                    for (var m = 0; m < messages.length; m++) {
                        userService
                            .findUserById(messages[m].fromWhom)
                            .then(function (user) {
                                messages[m].fromWhom = user;
                            })
                    }
                    model.messages = messages;
                })
        }

        function deleteMessage(message) {
            userService
                .deleteMessage(message._id)
                .then(renderMessage());
        }
    }
})();

