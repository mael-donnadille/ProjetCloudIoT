app.controller('UserController', function($scope, $http) {
    $scope.message = '';
    $scope.login = function() {
        const data = { username: $scope.username, password: $scope.password };
        $http.post('/api/users/login', data, { withCredentials: true })
            .then(function(response) {
                $scope.message = 'Connexion réussie : ' + response.data.username;
                alert('Connexion réussie');
            }, function(error) {
                $scope.message = 'Erreur de connexion : ' + error.data.error;
                alert('Erreur de connexion');
            });
    };

    $scope.logout = function() {
        $http.post('/api/users/logout', {}, { withCredentials: true })
            .then(function(response) {
                $scope.message = 'Déconnexion réussie';
                alert('Déconnexion réussie');
            }, function(error) {
                $scope.message = 'Erreur de déconnexion : ' + error.data.error;
                alert('Erreur lors de la déconnexion');
            });
    };
});
