angular.module('AngularRails')
  .controller('AccountsCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
      $scope.bars = ['Who', 'Foo', 'Dat', 'Ham', 'At', 'Me???'];

      if ($rootScope.accountProfile == undefined) {
        $scope.accountProfile = new AccountProfile();
      } else {
        $scope.accountProfile = $rootScope.accountProfile;
      }

      $scope.processForm = function() {
        $http({
          method  : 'GET',
          url     : 'https://api.eveonline.com/account/APIKeyInfo.xml.aspx',
          params  : $scope.accountProfile,
          transformResponse:function(data) {
            // convert the data to JSON and provide
            // it to the success function below
            // it will always at an _attributePrefix, so append a char that we can replace
            var x2js = new X2JS({attributePrefix:"@"});
            var json = x2js.xml_str2json( data);

            // replace the attribute prefix
            var json_data = JSON.stringify(json).replace(/@/g, '');

            // convert back to JSON
            json = JSON.parse(json_data);

            return json;
          }
        })
            .success(function(data) {
              console.log(data);

              $scope.accountProfile.access_mask = data['eveapi']['result']['key']['accessMask'];
              $scope.accountProfile.expires     = data['eveapi']['result']['key']['expires'];
              $scope.accountProfile.type        = data['eveapi']['result']['key']['type'];
              var charRowData = data['eveapi']['result']['key']['rowset']['row'];
              var charArray = [];

              charRowData.forEach(function(charData){
                var character = new CharacterData();
                character["alliance_id"] = charData["allianceID"];
                character["alliance_name"] = charData["allianceName"];
                character["character_id"] = charData["characterID"];
                character["character_name"] = charData["characterName"];
                character["corporation_id"] = charData["corporationID"];
                character["corporation_name"] = charData["corporationName"];
                character["faction_id"] = charData["factionID"];
                character["faction_name"] = charData["factionName"];

                charArray.push(character);
              });

              $scope.accountProfile.characters = charArray;

              // update rootscope var
              $rootScope.accountProfile = $scope.accountProfile;
            });
      };
  }]);