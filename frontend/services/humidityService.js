var app = angular.module('iotApp');

app.service('HumidityService', function($http) {
    const API_URL = 'http://localhost:3000/api/humidity';

    // Récupérer toutes les humidités
    this.getAll = function() {
        return $http.get(API_URL, {
            withCredentials: true  // Inclure les cookies de session
        });
    };

    // Ajouter une nouvelle humidité
    this.add = function(value) {
        return $http.post(API_URL, { value: value }, {
            withCredentials: true  // Inclure les cookies de session
        });
    };

    // Mettre à jour une humidité existante
    this.update = function(id, newValue) {
        return $http.put(`${API_URL}/${id}`, { value: newValue }, {
            withCredentials: true  // Inclure les cookies de session
        });
    };

    // Supprimer une humidité
    this.remove = function(id) {
        return $http.delete(`${API_URL}/${id}`, {
            withCredentials: true  // Inclure les cookies de session
        });
    };
});
