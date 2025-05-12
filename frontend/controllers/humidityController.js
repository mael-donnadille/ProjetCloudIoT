app.controller('HumidityController', function($scope, HumidityService) {
    $scope.humidities = [];
    $scope.newHumidity = '';

    function loadHumidities() {
        HumidityService.getAll().then(function(response) {
            $scope.humidities = response.data;
        }, function(error) {
            console.error('Erreur lors de la récupération des humidités:', error);
        });
    }

    $scope.addHumidity = function() {
        if ($scope.newHumidity) {
            HumidityService.add($scope.newHumidity).then(function() {
                loadHumidities();
                $scope.newHumidity = '';
            }, function(error) {
                console.error('Erreur lors de l\'ajout de l\'humidité:', error);
            });
        }
    };

    
    loadHumidities();
});
