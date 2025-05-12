app.controller('TemperatureController', function($scope, TemperatureService) {
    $scope.temperatures = [];
    $scope.newTemperature = '';

    function loadTemperatures() {
        TemperatureService.getAll().then(function(response) {
            $scope.temperatures = response.data;
        }, function(error) {
            console.error('Erreur lors de la récupération des températures:', error);
        });
    }

    $scope.addTemperature = function() {
        if ($scope.newTemperature) {
            TemperatureService.add($scope.newTemperature).then(function() {
                loadTemperatures();
                $scope.newTemperature = '';
            }, function(error) {
                console.error('Erreur lors de l\'ajout de la température:', error);
            });
        }
    };

    loadTemperatures();
});
