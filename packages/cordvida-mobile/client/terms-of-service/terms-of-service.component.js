angular.module("cordvida.mobile").controller('TermsOfServiceCtrl', 
  function ($scope, $reactive, $state) {
    $reactive(this).attach($scope);
    console.log('terms of service controller');

    $scope.goBack = () => {
      $state.go('login');
    }
  }
);
