angular.module('cordvida.browser').directive('usersList', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/users-list/users-list.html',
    controllerAs: 'usersList',
    scope: {
      urgentOnly: '='
    },
    controller: function($scope, $reactive, $state) {
      $reactive(this).attach($scope);
      
      const queryField = $scope.urgentOnly ? 
        {'profile.status': 'urgency'} : 
        {'profile.status': {$ne: 'urgency'}};
      
      this.helpers({
        users: () => {
          return Meteor.users.find(queryField, {
            sort:{
              'profile.name': 1,
            },
            fields: {
              emails: 1,
              profile: 1,
              status: 1,
              aggregatedScore: 1,
              lastLocationTime: 1,
            },
          });
        }
      });

      const handle = this.subscribe('users');

      Tracker.autorun(() => {
        const isReady = handle.ready();
        console.log('this.users --->', this.users);
      });
    }
  }
});