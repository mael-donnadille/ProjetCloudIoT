app.controller('HumidityController', function($scope, HumidityService) {
    $scope.humidities = [];
    $scope.newHumidity = '';

    function loadHumidities() {
        HumidityService.getAll().then(function(response) {
            $scope.humidities = response.data;
            updateChart($scope.humidities);
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

    function updateChart(data) {
        const labels = data.map(item => new Date(item.timestamp).toLocaleString());
        const values = data.map(item => item.value);

        const ctx = document.getElementById('humidityChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Humidité (%)',
                    data: values,
                    borderColor: 'blue',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Date' } },
                    y: { title: { display: true, text: 'Humidité (%)' } }
                }
            }
        });
    }

    loadHumidities();
});
