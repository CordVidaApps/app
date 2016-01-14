angular.module('cordvida.browser').directive('userDetails', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/user-details/user-details.html',
    controllerAs: 'userDetails',
    controller: function($scope, $stateParams, $reactive) {
      $reactive(this).attach($scope);

      this.helpers({
        user: () => {
          return Meteor.users.findOne({ _id: $stateParams.userId });
        },
        locations: () => {
          var timeThreshold = moment().subtract(3, 'hours').toDate();
          return Locations.find({
            userId: $stateParams.userId,
            date: { $gt: timeThreshold }
          });
        },
        scores: () => {
          var timeThreshold = moment().subtract(3, 'hours').toDate();
          return Scores.find({
            userId: $stateParams.userId,
            createdAt: { $gt: timeThreshold }
          });
        },
      });

      this.subscribe('users');
      this.subscribe('userLocations', () => {
        return [ $stateParams.userId ];
      });
      this.subscribe('userScores', () => {
        return [ $stateParams.userId ];
      });

      this.userLat = () => {
        if(this.user) {
          return this.user.profile.maternityLocation.latitude;
        }
        return -15.7833;
      }

      this.userLng = () => {
        if(this.user) {
          return this.user.profile.maternityLocation.longitude;
        }
        return -47.8667;
      }

      this.userMaternityLocation = () => {
        return this.user && this.user.profile.maternityLocation;
      };

      this.userId = () => {
        return this.user && this.user._id;
      }

      this.map = {
        center: {
          latitude: this.userLat(),
          longitude: this.userLng(),
        },
        zoom: 14,
        events: {},
        marker: {
          options: { draggable: false },
          events: {}
        }
      };
    }
  }
});