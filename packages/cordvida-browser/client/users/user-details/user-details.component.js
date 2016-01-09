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
          return Locations.find({userId: $stateParams.userId});
        }
      });

      this.subscribe('users');
      this.subscribe('userLocations', () => {
        return [ $stateParams.userId ];
      });

      this.map = {
        center: {
          latitude: this.user.profile.maternityLocation.latitude ? this.user.profile.maternityLocation.latitude : -15.7833,
          longitude: this.user.profile.maternityLocation.longitude ? this.user.profile.maternityLocation.longitude : -47.8667,
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