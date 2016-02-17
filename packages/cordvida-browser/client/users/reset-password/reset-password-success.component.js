angular.module('cordvida.browser').directive('resetPasswordSuccess', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/reset-password/reset-password-success.html',
    controllerAs: 'resetPasswordSuccess',
    controller: function($scope, $state, $stateParams, $reactive) {
      $reactive(this).attach($scope);
      
      console.log('reset password page', $stateParams);
      
    }
  }
});

