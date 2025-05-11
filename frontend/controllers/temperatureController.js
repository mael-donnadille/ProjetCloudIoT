app.controller('TemperatureController', function($scope, TemperatureService) {
    $scope.temperatures = [];
    $scope.newTemperature = '';

    function loadTemperatures() {
        TemperatureService.getAll().then(function(response) {
            $scope.temperatures = response.data;
        });
    }

    $scope.addTemperature = function() {
        if ($scope.newTemperature) {
            TemperatureService.add($scope.newTemperature).then(function() {
                loadTemperatures();
                $scope.newTemperature = '';
            });
        }
    };

 
    loadTemperatures();
});
