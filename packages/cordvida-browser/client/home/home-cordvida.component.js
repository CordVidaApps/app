angular.module('cordvida.browser').directive('homeCordvida', function () {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/home/home-cordvida.html',
    controllerAs: 'homeCordvida',
    controller: function ($scope, $reactive, $state) {
      $reactive(this).attach($scope);

      this.goToNewUserPage = () => {
        console.log('going to new user page');
        $state.go('newUsers');
      }
    }
  }
});