(function () {
    angular
        .module('FinalProject')
        .controller('photoController', photoController);

    function photoController($routeParams, $location, widgetService,currentUser) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.getWidgetType = getWidgetType;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (response) {
                    model.widgets = response;
                });
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (response) {
                    model.widget = angular.copy(response);
                });
            // console.log(model.widget);
        }

        init();

        function getWidgetType() {
            return model.widget.widgetType;
        }

        function updateWidget() {
            // console.log("update");
            if (model.widget.size !== undefined) {
                model.widget.size = model.widget.size.split(" ")[0];
            }
            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function (response) {
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                })
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.pageId, model.widgetId)
                .then(function (response) {
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                }, function (response) {
                    model.error = "Cannot delete this widget!";
                })

        }

    }
})();