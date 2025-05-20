var app = angular.module('iotApp');

app.controller('temperatureController', function($scope, TemperatureService) {
    $scope.temperatures = [];
    $scope.newTemperature = '';

    // Charger les températures
    function loadTemperatures() {
        TemperatureService.getAll().then(function(response) {
            $scope.temperatures = response.data;
        }).catch(function(error) {
            console.error('Erreur lors de la récupération des températures:', error);
        });
    }

    // Ajouter une température
    $scope.addTemperature = function() {
        if ($scope.newTemperature) {
            TemperatureService.add($scope.newTemperature).then(function() {
                alert('Température ajoutée avec succès');
                loadTemperatures();
                $scope.newTemperature = '';
            }).catch(function(error) {
                console.error('Erreur lors de l\'ajout de la température:', error);
            });
        }
    };

    // Mettre à jour une température
    $scope.updateTemperature = function(id, newValue) {
        TemperatureService.update(id, newValue).then(function() {
            alert('Température mise à jour');
            loadTemperatures();
        }).catch(function(error) {
            console.error('Erreur lors de la mise à jour de la température:', error);
        });
    };

    // Supprimer une température
    $scope.removeTemperature = function(id) {
        if (confirm('Voulez-vous vraiment supprimer cette température ?')) {
            TemperatureService.remove(id).then(function() {
                alert('Température supprimée');
                loadTemperatures();
            }).catch(function(error) {
                console.error('Erreur lors de la suppression de la température:', error);
            });
        }
    };

    // Initialiser les données
    loadTemperatures();
});
