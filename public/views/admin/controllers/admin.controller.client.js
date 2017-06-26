(function () {
    angular
        .module('FinalProject')
        .controller('adminController', adminController);

    function adminController(currentUser) {
        var model = this;
        model.currentUser = currentUser;

    }

})();