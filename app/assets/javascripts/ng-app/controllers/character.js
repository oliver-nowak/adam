angular.module('AngularRails')
  .controller('CharacterCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
      $scope.bars = ["foo", "bar"]

      $scope.selectedPilot = "default";

      $scope.choosePilot = function() {
        console.log(">>> " + $scope.selectedPilot);


      }
    }]);