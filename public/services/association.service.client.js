(function () {
    angular
        .module("FinalProject")
        .service("associationService", AssociationService);

    function AssociationService($http) {


        this.createAssociation = createAssociation;
        this.updateAssociation = updateAssociation;
        this.deleteAssociationById = deleteAssociationById;

        this.findAssociationById = findAssociationById;
        this.findAllAssociationByType = findAllAssociationByType;
        this.findAssociationForSource = findAssociationForSource;
        this.findAssociationForTarget = findAssociationForTarget;
        this.findAssociationForSourceTarget = findAssociationForSourceTarget;
        this.findAllComments = findAllComments;


        function findAllComments() {
            return $http.get('/api/association/find/comments')
                .then(extractData);
        }


        function createAssociation(association) {
            var url = '/api/association';
            return $http.post(url, association)
                .then(extractData)
        }

        function updateAssociation(associationId, association) {
            var url = '/api/association/' + associationId
            return $http.put(url, association)
                .then(extractData)
        }

        function deleteAssociationById(associationId) {
            var url = '/api/association/' + associationId
            return $http.delete(url)
                .then(extractData)
        }

        function findAssociationById(associationId) {
            var url = '/api/association/find/id/' + associationId
            return $http.get(url)
                .then(extractData)
        }

        function findAllAssociationByType(associationType) {
            var url = '/api/association/find/type/' + associationType;
            return $http.get(url)
                .then(extractData)
        }

        function findAssociationForSource(associationType, sourceId) {
            var url = '/api/association/find/type/' + associationType + '/from/' + sourceId;
            return $http.get(url)
                .then(extractData)
        }

        function findAssociationForTarget(associationType, targetType, targetId) {
            var url = '/api/association/find/type/' + associationType + '/to/' + targetType + '/' + targetId;
            return $http.get(url)
                .then(extractData)
        }

        function findAssociationForSourceTarget(associationType, sourceId, targetType, targetId) {
            var url = '/api/association/find/type/' + associationType + '/from/' + sourceId + '/to/' + targetType + '/' + targetId;
            return $http.get(url)
                .then(extractData)
        }

        function extractData(response) {
            return response.data;
        }
    }
})();