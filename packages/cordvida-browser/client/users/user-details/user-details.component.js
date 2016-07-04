angular.module('cordvida.browser').directive('userDetails', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/user-details/user-details.html',
    controllerAs: 'userDetails',
    controller: function($scope, $stateParams, GoogleMaps) {
      $scope.mapsEnabled = false;
      
      $scope.helpers({
        user: () => {
          return Meteor.users.findOne({ _id: $stateParams.userId });
        },
        locations: () => {
          var timeThreshold = moment().subtract(3, 'hours').toDate();
          return Locations.find({
            userId: $stateParams.userId,
            date: { $gt: timeThreshold },
          }, {
            limit: 20,
          });
        },
        scores: () => {
          var timeThreshold = moment().subtract(3, 'hours').toDate();
          return Scores.find({
            userId: $stateParams.userId,
            createdAt: { $gt: timeThreshold }
          }, {
            limit: 20,
          });
        },
      });

      $scope.subscribe('users');
      $scope.subscribe('userLocations', () => {
        return [ $stateParams.userId ];
      });
      $scope.subscribe('userScores', () => {
        return [ $stateParams.userId ];
      });

      $scope.userLat = () => {
        if($scope.user) {
          return $scope.user.profile.maternityLocation.latitude;
        }
        return -15.7833;
      }

      $scope.userLng = () => {
        if($scope.user) {
          return $scope.user.profile.maternityLocation.longitude;
        }
        return -47.8667;
      }

      $scope.userMaternityLocation = () => {
        return $scope.user && $scope.user.profile.maternityLocation;
      };

      $scope.userId = () => {
        return $scope.user && $scope.user._id;
      }

      $scope.initMap = (lat, lng, zoom) => {
        var latLng = new google.maps.LatLng(lat, lng);
        var mapOptions = {
          center: latLng,
          zoom: zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("new-user-map"), mapOptions);
        google.maps.event.addListenerOnce($scope.map, 'idle', () => {
          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            options: { draggable: false },
          });
        });
      }

      GoogleMaps.init().then(
        (res) => {
          console.log('google maps iniciado com sucesso', res);
          $scope.mapsEnabled = true;
          $scope.initMap($scope.userLat(), $scope.userLng(), 14);
        }, 
        (err) => {
          console.log('erro init google maps', err);
        }
      );
    }
  }
});