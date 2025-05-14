app.controller('DashboardController', function($scope, $location, $http) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        $location.path('/login');
    } else {
        $scope.user = user;
    }

    $scope.logout = function() {
        sessionStorage.removeItem('user');
        alert('Déconnexion réussie');
        $location.path('/login');
    };

    function loadValues() {
        $http.get('/api/values')
            .then(function(response) {
                $scope.values = response.data;
            }, function(error) {
                console.error('Erreur lors de la récupération des valeurs:', error);
            });
    }

    $scope.isAdmin = function() {
        return $scope.user.role === 'admin';
    };

    $scope.addValue = function() {
        const newValue = {
            name: $scope.newValueName,
            data: $scope.newValueData
        };
        $http.post('/api/values', newValue)
            .then(function(response) {
                alert('Valeur ajoutée avec succès');
                loadValues();
                $scope.newValueName = '';
                $scope.newValueData = '';
            }, function(error) {
                console.error('Erreur lors de l\'ajout:', error);
            });
    };

    $scope.editValue = function(value) {
        if ($scope.isAdmin()) {
            const updatedValue = prompt('Modifier la valeur:', value.data);
            if (updatedValue) {
                value.data = updatedValue;
                $http.put('/api/values/' + value._id, value)
                    .then(function(response) {
                        alert('Valeur mise à jour');
                        loadValues();
                    }, function(error) {
                        console.error('Erreur lors de la modification:', error);
                    });
            }
        } else {
            alert('Vous n\'avez pas l\'autorisation de modifier.');
        }
    };

    $scope.deleteValue = function(value) {
        if ($scope.isAdmin()) {
            if (confirm('Voulez-vous vraiment supprimer cette valeur ?')) {
                $http.delete('/api/values/' + value._id)
                    .then(function(response) {
                        alert('Valeur supprimée');
                        loadValues();
                    }, function(error) {
                        console.error('Erreur lors de la suppression:', error);
                    });
            }
        } else {
            alert('Vous n\'avez pas l\'autorisation de supprimer.');
        }
    };

    loadValues();
});
