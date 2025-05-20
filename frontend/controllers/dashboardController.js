var app = angular.module('iotApp');

app.controller('dashboardController', function($scope, $location, UserService, $http) {
    // Vérifier si l'utilisateur est connecté
    $scope.user = UserService.getUser();

    if (!$scope.user) {
        $location.path('/login');
        return;
    }

    // Déconnexion
    $scope.logout = function() {
        UserService.logout().then(function() {
            UserService.clearUser();
            $location.path('/login');
        }).catch(function(error) {
            alert('Erreur lors de la déconnexion');
            console.error('Erreur de déconnexion:', error);
        });
    };

    // Vérification des permissions (admin)
    $scope.isAdmin = function() {
        return $scope.user && $scope.user.role === 'admin';
    };

    // Charger les valeurs depuis l'API
    function loadValues() {
        $http.get('http://localhost:3000/api/values', { withCredentials: true })
            .then(function(response) {
                $scope.values = response.data;
            })
            .catch(function(error) {
                console.error('Erreur lors de la récupération des valeurs:', error);
            });
    }

    // Ajouter une valeur
    $scope.add = function() {
        const newValue = prompt('Entrez la nouvelle valeur:');
        if (newValue) {
            $http.post('http://localhost:3000/api/values', { name: newValue }, { withCredentials: true })
                .then(function(response) {
                    alert('Valeur ajoutée avec succès');
                    loadValues();
                })
                .catch(function(error) {
                    console.error('Erreur lors de l\'ajout:', error);
                });
        }
    };

    // Modifier une valeur
    $scope.edit = function(value) {
        if (!$scope.isAdmin()) {
            alert('Vous n\'avez pas les droits pour modifier cette valeur');
            return;
        }
        const newValue = prompt('Modifier la valeur:', value.data);
        if (newValue) {
            $http.put(`http://localhost:3000/api/values/${value._id}`, { data: newValue }, { withCredentials: true })
                .then(function(response) {
                    alert('Valeur modifiée avec succès');
                    loadValues();
                })
                .catch(function(error) {
                    console.error('Erreur lors de la modification:', error);
                });
        }
    };

    // Supprimer une valeur
    $scope.remove = function(value) {
        if (!$scope.isAdmin()) {
            alert('Vous n\'avez pas les droits pour supprimer cette valeur');
            return;
        }
        if (confirm('Voulez-vous vraiment supprimer cette valeur ?')) {
            $http.delete(`http://localhost:3000/api/values/${value._id}`, { withCredentials: true })
                .then(function(response) {
                    alert('Valeur supprimée avec succès');
                    loadValues();
                })
                .catch(function(error) {
                    console.error('Erreur lors de la suppression:', error);
                });
        }
    };

    // Charger les valeurs au démarrage
    loadValues();
});
