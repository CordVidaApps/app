angular.module('cordvida').directive('usersList', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/users/users-list/users-list.html',
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