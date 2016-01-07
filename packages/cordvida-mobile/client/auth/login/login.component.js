angular.module("cordvida.mobile").directive('login', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/auth/login/login.html',
    controllerAs: 'login',
    controller: function ($scope, $reactive) {
      $reactive(this).attach($scope);
    }
  }
});