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
          })
          .when('/characters', {
            templateUrl: 'character.html',
            controller: 'CharacterCtrl',
            location: 'character'
          });
      $locationProvider.html5Mode(true);
    });