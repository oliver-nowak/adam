angular
  .module('AngularRails', [
    'ngRoute',
    'templates'
    ]).config(function ($routeProvider, $locationProvider) {
      $routeProvider
          .when('/', {
              templateUrl: 'home.html',
              controller: 'HomeCtrl',
              location: 'home'
          })
          .when('/accounts', {
            templateUrl: 'accounts.html',
            controller: 'AccountsCtrl',
            location: 'accounts'
          });
      $locationProvider.html5Mode(true);
    });