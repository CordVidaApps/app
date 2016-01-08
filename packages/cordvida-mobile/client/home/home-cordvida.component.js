angular.module('cordvida.mobile').directive('homeCordvida', function () {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-mobile/client/home/home-cordvida.html',
    controllerAs: 'homeCordvida',
    controller: function ($scope, $reactive, $state) {
      $reactive(this).attach($scope);

      this.logout = () => {
        Accounts.logout();
        $state.go('login');
      }
    }
  }
});