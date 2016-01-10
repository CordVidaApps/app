angular.module('cordvida.browser').directive('userItem', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/user-item/user-item.html',
    controllerAs: 'userItem',
    scope: {
      user: '='
    },
    controller: function($scope, $reactive, $state) {
      $reactive(this).attach($scope);

      this.user = $scope.user;

      this.goToUser = (user) => {
        $state.go('userDetails', {userId: this.user._id});
      }
    }
  }
});