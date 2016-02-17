angular.module('cordvida.browser').directive('usersList', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/users-list/users-list.html',
    controllerAs: 'usersList',
    controller: function($scope, $reactive, $state) {
      $reactive(this).attach($scope);

      this.helpers({
        users: () => {
          return Meteor.users.find({}, {
            fields: {
              emails: 1,
              profile: 1,
              status: 1,
              aggregatedScore: 1,
              lastLocationTime: 1,
            }
          });
        }
      });

      this.subscribe('users');

      this.goToNewUserPage = () => {
        console.log('going to new user page');
        $state.go('newUsers');
      }
    }
  }
});