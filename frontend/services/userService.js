var app = angular.module('iotApp');

app.factory('UserService', function($http) {
    const API_URL = 'http://localhost:3000/api/users';

    return {
        // Connexion
        login: function(credentials) {
            return $http.post(`${API_URL}/login`, credentials, {
                withCredentials: true
            });
        },
        // Récupérer le profil de l'utilisateur connecté
        profile: function() {
            return $http.get(`${API_URL}/profile`, {
                withCredentials: true
            });
        },
        // Déconnexion
        logout: function() {
            return $http.get(`${API_URL}/logout`, {
                withCredentials: true
            });
        }
    };
});
