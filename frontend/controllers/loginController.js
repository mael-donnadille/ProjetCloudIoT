app.controller('LoginController', function($scope, $location, AuthService) {
    $scope.message = '';
    $scope.login = function() {
        const credentials = {
            username: $scope.username,
            password: $scope.password
        };
        AuthService.login(credentials).then(function(response) {
            $scope.message = 'Connexion réussie';
            localStorage.setItem('user', JSON.stringify(response.data));
            $location.path('/dashboard');
        }, function(error) {
            $scope.message = 'Identifiants incorrects';
            console.error('Erreur de connexion:', error);
        });
    };

    $scope.logout = function() {
        AuthService.logout().then(function() {
            localStorage.removeItem('user');
            $location.path('/login');
        });
    };
});
