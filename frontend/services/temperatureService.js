app.service('TemperatureService', function($http) {
    const API_URL = 'http://localhost:3000/api/temperature';

    this.getAll = function() {
        return $http.get(API_URL);
    };

    this.add = function(value) {
        return $http.post(API_URL, { value: value });
    };
});

