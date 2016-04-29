angular.module("cordvida.mobile").directive('termsOfService', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-mobile/client/terms-of-service/terms-of-service.html',
    controllerAs: 'termsOfService',
    controller: function ($scope, $reactive, $state) {
      $reactive(this).attach($scope);
      console.log('terms of service controller');

      this.goBack = () => {
        $state.go('login');
      }
    }
  }
});
