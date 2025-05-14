var app = angular.module('iotApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController'
        })
        .when('/dashboard', {
            templateUrl: 'pages/dashboard.html',
            controller: 'LoginController'
        })
        .otherwise({
            redirectTo: '/login'
        });
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user && next.templateUrl !== 'pages/login.html') {
            $location.path('/login');
        }
    });
});
