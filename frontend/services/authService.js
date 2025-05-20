var app = angular.module('iotApp');

app.factory('AuthService', function($http) {
    return {
        // Connexion de l'utilisateur
        login: function(credentials) {
            return $http.post('http://localhost:3000/api/users/login', credentials, { 
                withCredentials: true 
            });
        },

        // Déconnexion de l'utilisateur
        logout: function() {
            return $http.get('http://localhost:3000/api/users/logout', { 
                withCredentials: true 
            });
        },

        // Récupération du profil utilisateur
        getProfile: function() {
            return $http.get('http://localhost:3000/api/users/profile', { 
                withCredentials: true 
            });
        },

        // Vérification de l'authentification (vérifie si un utilisateur est connecté)
        isAuthenticated: function() {
            return !!sessionStorage.getItem('user');
        },

        // Récupérer l'utilisateur connecté depuis la session
        getUser: function() {
            const user = sessionStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        },

        // Stocker l'utilisateur dans la session
        setUser: function(user) {
            sessionStorage.setItem('user', JSON.stringify(user));
        },

        // Supprimer l'utilisateur de la session
        clearUser: function() {
            sessionStorage.removeItem('user');
        }
    };
});
