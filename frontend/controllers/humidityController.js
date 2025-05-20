var app = angular.module('iotApp');

app.controller('humidityController', function($scope, HumidityService) {
    $scope.humidities = [];
    $scope.newHumidity = '';

    // Charger les humidités
    function loadHumidities() {
        HumidityService.getAll().then(function(response) {
            $scope.humidities = response.data;
        }).catch(function(error) {
            console.error('Erreur lors de la récupération des humidités:', error);
        });
    }

    // Ajouter une humidité
    $scope.addHumidity = function() {
        if ($scope.newHumidity) {
            HumidityService.add($scope.newHumidity).then(function() {
                alert('Humidité ajoutée avec succès');
                loadHumidities();
                $scope.newHumidity = '';
            }).catch(function(error) {
                console.error('Erreur lors de l\'ajout de l\'humidité:', error);
            });
        }
    };

    // Mettre à jour une humidité
    $scope.updateHumidity = function(id, newValue) {
        HumidityService.update(id, newValue).then(function() {
            alert('Humidité mise à jour');
            loadHumidities();
        }).catch(function(error) {
            console.error('Erreur lors de la mise à jour de l\'humidité:', error);
        });
    };

    // Supprimer une humidité
    $scope.removeHumidity = function(id) {
        if (confirm('Voulez-vous vraiment supprimer cette humidité ?')) {
            HumidityService.remove(id).then(function() {
                alert('Humidité supprimée');
                loadHumidities();
            }).catch(function(error) {
                console.error('Erreur lors de la suppression de l\'humidité:', error);
            });
        }
    };

    // Initialiser les données
    loadHumidities();
});
