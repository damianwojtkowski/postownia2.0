angular.module('postownia', ['ngRoute']);

angular.module('postownia').config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/indexView.html',
      controller: 'IndexCtrl',
      controllerAs: 'index'
    })
    .otherwise('/');
    $locationProvider.html5Mode(true);
});
