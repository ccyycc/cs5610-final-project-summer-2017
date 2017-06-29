(function () {
    angular
        .module('FinalProject')
        .controller('inboxController', inboxController);

    function inboxController($routeParams, userService, $location, currentUser) {

        var model = this;

        model.deleteMessage = deleteMessage;
        model.showInbox = showInbox;
        model.showOutbox = showOutbox;
        model.logout = logout;

        model.userId = currentUser._id;
        model.sectionTitle = "Inbox";

        init();

        function init() {
            if (currentUser._id) {
                model.ifLoggedIn = true;
            }

            showInbox()
        }

        function showInbox() {
            userService
                .renderInMessage()
                .then(function (messages) {
                    model.messages = messages;
                    model.inboxActive = 'active';
                    model.outboxActive = ''
                })
        }

        function showOutbox() {
            userService
                .renderOutMessage()
                .then(function (messages) {
                    model.messages = messages;
                    model.inboxActive = '';
                    model.outboxActive = 'active'
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

