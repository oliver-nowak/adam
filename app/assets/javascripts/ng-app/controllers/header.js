angular.module('AngularRails')
  .controller('HeaderCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
        $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path();
        };

      $scope.accountProfile = $rootScope.accountProfile;
    }]);