angular.module('cordvida.browser').directive('resetPassword', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/reset-password/reset-password.html',
    controllerAs: 'resetPassword',
    controller: function($scope, $state, $stateParams, $reactive) {
      $reactive(this).attach($scope);
      
      console.log('reset password page', $stateParams);
      this.passwordObj = {
        password: '',
        confirmPassword: '',
      }

      this.savePassword = () => {
        console.log('THIS:', this, $scope);
        Accounts.resetPassword($stateParams.token, this.passwordObj.password, (error) => {
          if(error) {
            console.log('error', error);
          } else {
            console.log('password reset success');
            $state.go('password-reset-success');
          }
        });
      }
    }
  }
});

