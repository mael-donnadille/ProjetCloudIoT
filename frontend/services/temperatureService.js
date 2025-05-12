app.service('HumidityService', function($http) {
    const API_URL = 'http://localhost:3000/api/humidity';

    this.getAll = function() {
        return $http.get(API_URL);
    };

    this.add = function(value) {
        return $http.post(API_URL, { value: value });
    };
});
