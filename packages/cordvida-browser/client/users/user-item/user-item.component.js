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
      };

      this.estimateBornDate = () => {
        return moment(this.user.profile.estimateBornDate).format('DD/MM/YYYY');
      };

      this.timeFromLastLocation = () => {
        return moment(this.user.lastLocationTime).fromNow();
      }
    }
  }
});