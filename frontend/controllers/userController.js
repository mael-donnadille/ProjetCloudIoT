var app = angular.module('iotApp');

app.controller('usserController', function($scope, $http, $location) {
    $scope.message = '';
    $scope.username = '';
    $scope.password = '';
    $scope.user = null;

    // Vérifier si l'utilisateur est connecté au chargement de la page
    function checkLoginStatus() {
        $http.get('/api/users/profile', { withCredentials: true })
            .then(function(response) {
                $scope.user = response.data;
                $scope.message = 'Bienvenue ' + response.data.username;
            })
            .catch(function(error) {
                console.error('Utilisateur non authentifié');
                $scope.user = null;
                $scope.message = 'Non connecté';
            });
    }

    // Connexion de l'utilisateur
    $scope.login = function() {
        const data = { username: $scope.username, password: $scope.password };
        $http.post('/api/users/login', data, { withCredentials: true })
            .then(function(response) {
                $scope.user = response.data;
                $scope.message = 'Connexion réussie : ' + response.data.username;
                alert('Connexion réussie');
                sessionStorage.setItem('user', JSON.stringify(response.data));
                $location.path('/dashboard');
            })
            .catch(function(error) {
                $scope.message = 'Erreur de connexion : ' + (error.data.error || 'Vérifiez vos identifiants');
                alert('Erreur de connexion');
                console.error('Erreur de connexion:', error);
            });
    };

    // Déconnexion de l'utilisateur
    $scope.logout = function() {
        $http.get('/api/users/logout', { withCredentials: true })
            .then(function(response) {
                $scope.user = null;
                sessionStorage.removeItem('user');
                $scope.message = 'Déconnexion réussie';
                alert('Déconnexion réussie');
                $location.path('/login');
            })
            .catch(function(error) {
                $scope.message = 'Erreur de déconnexion : ' + (error.data.error || 'Impossible de se déconnecter');
                alert('Erreur lors de la déconnexion');
                console.error('Erreur de déconnexion:', error);
            });
    };

    // Vérifier l'état de la connexion au chargement de la page
    checkLoginStatus();
});
