app.controller('LoginController', function($scope, $location, UserService) {
    $scope.username = '';
    $scope.password = '';
    $scope.message = '';

    $scope.login = function() {
        const credentials = {
            username: $scope.username,
            password: $scope.password
        };

        UserService.login(credentials).then(function(response) {
            if (response.data.username) {
                sessionStorage.setItem('user', JSON.stringify(response.data));
                $location.path('/dashboard');
            } else {
                $scope.message = 'Identifiants incorrects';
            }
        }).catch(function(error) {
            $scope.message = 'Erreur de connexion';
            console.error(error);
        });
    };
});
