angular.module('cordvida.browser').directive('editUser', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/edit-user/edit-user.html',
    controllerAs: 'editUser',
    controller: function($scope, $reactive, $stateParams) {
      $reactive(this).attach($scope);

      console.log('edit user directive');

      this.helpers({
        user: () => {
          return Meteor.users.findOne({ _id: $stateParams.userId });
        },
      });

      this.subscribe('users');

    }
  }
});