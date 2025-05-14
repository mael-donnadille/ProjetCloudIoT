app.factory('AuthService', function($http) {
    return {
        login: function(credentials) {
            return $http.post('http://localhost:3000/api/users/login', credentials, { withCredentials: true });
        },
        logout: function() {
            return $http.get('http://localhost:3000/api/users/logout', { withCredentials: true });
        },
        getProfile: function() {
            return $http.get('http://localhost:3000/api/users/profile', { withCredentials: true });
        }
    };
});
