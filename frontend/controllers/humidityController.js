app.controller('HumidityController', function($scope, HumidityService) {
    $scope.humidities = [];
    $scope.newHumidity = '';

    function loadHumidities() {
        HumidityService.getAll().then(function(response) {
            $scope.humidities = response.data;
        });
    }
    $scope.addHumidity = function() {
        if ($scope.newHumidity) {
            HumidityService.add($scope.newHumidity).then(function() {
                loadHumidities();
                $scope.newHumidity = '';
            });
        }
    };
    loadHumidities();
});
