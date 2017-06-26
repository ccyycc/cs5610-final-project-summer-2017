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
                .populateArr(model.userId, 'messages')
                .then(function (messages) {
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

