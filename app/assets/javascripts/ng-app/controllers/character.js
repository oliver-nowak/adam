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
          params : {keyID:keyID, vcode:vcode, characterID:characterID},
          transformResponse: function(data) {
            // TODO: refactor into service
            var x2js = new X2JS({attributePrefix:"@"});
            var json = x2js.xml_str2json(data);

            var json_data = JSON.stringify(json).replace(/@/g, '');
            json = JSON.parse(json_data);

            return json;
          }
        })
            .success(function(data) {
              console.log(data);

              var serverCharData = data['eveapi']['result']
              var localCharData  = $scope.accountProfile.characters[$scope.selectedPilot];

              localCharData["dob"] = serverCharData["DoB"];
              localCharData["race"]= serverCharData["race"];
              localCharData["bloodline"] = serverCharData["bloodline"];
              localCharData["ancestry"] = serverCharData["ancestry"];
              localCharData["gender"] = serverCharData["gender"];
              localCharData["clone_name"] = serverCharData["cloneName"];
              localCharData["clone_skill_points"] = serverCharData["cloneSkillPoints"];
              localCharData["balance"] = serverCharData["balance"];

            });
      };
    }]);