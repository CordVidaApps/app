angular.module('cordvida.browser').directive('usersList', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/users-list/users-list.html',
    controllerAs: 'usersList',
    controller: function($scope, $reactive) {
      $reactive(this).attach($scope);

      this.helpers({
        users: () => {
          return Meteor.users.find({});
        }
      });

      this.subscribe('users');
    }
  }
});