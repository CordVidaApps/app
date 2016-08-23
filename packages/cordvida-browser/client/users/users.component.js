angular.module('cordvida.browser').directive('users', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/users.html',
    controllerAs: 'users',
    controller: function($scope, $reactive, $state) {
      $reactive(this).attach($scope);

      this.goToNewUserPage = () => {
        console.log('going to new user page');
        $state.go('newUsers'); 
      }
    }
  }
});