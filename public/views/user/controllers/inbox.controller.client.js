(function () {
    angular
        .module('FinalProject')
        .controller('inboxController', inboxController);

    function inboxController($routeParams, userService, $location, currentUser) {

        var model = this;

        // model.renderMessage = renderMessage;
        model.deleteMessage = deleteMessage;
        model.showInbox = showInbox;
        model.showOutbox = showOutbox;


        function init() {
            model.userId = currentUser._id;
            showInbox()
                // .error(userError());
        }
        init();

        function showInbox() {
            // console.log(model.userId);
            userService
                .renderInMessage()
                .then(function (messages) {
                    model.messages = messages;
                    console.log();
                    model.inboxActive = 'active';
                    model.outboxActive = ''
                    ///do not delete the console log!
                })
        }

        function showOutbox() {
            userService
                .renderOutMessage()
                .then(function (messages) {
                    model.messages = messages;
                    console.log();
                    model.inboxActive = '';
                    model.outboxActive = 'active'
                    ///do not delete the console log!
                })
        }
        function deleteMessage(message) {
            userService
                .deleteMessage(message._id)
                .then(function () {
                    if (model.inboxActive) {
                        showInbox();
                    } else {
                        showOutbox();
                    }
                });
        }
    }
})();

