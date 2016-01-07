angular.module('cordvida').directive('userDetails', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/users/user-details/user-details.html',
    controllerAs: 'userDetails',
    controller: function($scope, $stateParams, $reactive) {
      $reactive(this).attach($scope);

      this.helpers({
        user: () => {
          return Meteor.users.findOne({ _id: $stateParams.userId });
        }
      });

      this.subscribe('users');

      this.map = {
        center: {
          latitude: 45,
          longitude: -73
        },
        zoom: 8,
        events: {},
        marker: {
          options: { draggable: true },
          events: {}
        }
      };
    }
  }
});