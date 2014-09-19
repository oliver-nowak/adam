angular.module('AngularRails')
  .controller('CharacterCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
      $scope.bars = ["foo", "bar"];

      $scope.selectedPilot = "default";

      $scope.accountProfile = $rootScope.accountProfile;

      $scope.choosePilot = function() {
        console.log(">>> " + $scope.selectedPilot);
      };

      $scope.loadPilotData = function() {
        var keyID = $scope.accountProfile.keyID;
        var vcode = $scope.accountProfile.vcode;
        var characterID = $scope.accountProfile.characters[$scope.selectedPilot]["character_id"];
        $http({
          method: 'GET',
          url: 'https://api.eveonline.com/char/CharacterSheet.xml.aspx',
          params : {keyID:keyID, vcode:vcode, characterID:characterID}
        })
            .success(function(data) {
              console.log(data);
            });
      };
    }]);