(function () {
    angular
        .module('FinalProject')
        .controller('inboxController', inboxController);

    function inboxController($routeParams, userService, $location, currentUser) {

        var model = this;

        model.renderMessage = renderMessage;
        model.deleteMessage = deleteMessage;


        function init() {
            model.userId = currentUser._id;
            renderMessage()
                // .error(userError());
        }
        init();

        function renderMessage() {
            // console.log(model.userId);
            userService
                .renderMessage(model.userId)
                .then(function (messages) {
                    model.messages = messages;
                    console.log();
                    ///do not delete the console log!
                })
        }

        function deleteMessage(message) {
            userService
                .deleteMessage(message._id)
                .then(renderMessage());
        }
    }
})();

