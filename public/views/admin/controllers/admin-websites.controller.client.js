(function () {
    angular
        .module('FinalProject')
        .controller('adminWebsitesController', adminWebsitesController);

    function adminWebsitesController(websiteService) {
        var model = this;

        model.deleteWebsite = deleteWebsite;
        model.selectWebsite = selectWebsite;
        model.updateWebsite = updateWebsite;
        // model.currentUser = currentUser;

        function init() {
            findAllWebsites();
        }

        init();

        function updateWebsite(website) {
            // console.log(user);
            model.message = false;
            websiteService
                .updateWebsite(website._id, website)
                .then(function () {
                    model.message = "Website update successfully";
                })
                .then(findAllWebsites());
        }

        function selectWebsite(website) {
            model.website = angular.copy(website);
            console.log(model.website);
        }

        function deleteWebsite(website) {
            model.message = false;
            websiteService
                .deleteWebsite(website._id)
                .then(findAllWebsites());
        }

        function findAllWebsites() {
            websiteService
                .findAllWebsites()
                .then(function (websites) {
                    model.websites = websites;
                })
        }


    }

})();