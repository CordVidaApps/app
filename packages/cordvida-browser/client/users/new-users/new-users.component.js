angular.module('cordvida.browser').directive('newUsers', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/new-users/new-users.html',
    controllerAs: 'newUsers',
    controller: function($scope, $stateParams, $reactive, GoogleMaps) {
      $reactive(this).attach($scope);
      console.log('new users page');
    }
  }
});