(function () {
    angular
        .module('FinalProject')
        .controller('inboxController', inboxController);

    function inboxController($routeParams, userService, $location, currentUser) {

        var model = this;

        model.sectionTitle = "Inbox";
        model.userId = currentUser._id;

        // model.renderMessage = renderMessage;
        model.deleteMessage = deleteMessage;
        model.showInbox = showInbox;
        model.showOutbox = showOutbox;
        model.logout = logout;


        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }


            showInbox()
                // .error(userError());
        }
        init();

        function showInbox() {
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
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
    }
})();

