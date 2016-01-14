angular.module("cordvida.mobile").directive('login', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-mobile/client/auth/login/login.html',
    controllerAs: 'login',
    controller: function ($scope, $reactive, $state, $ionicLoading) {
      $reactive(this).attach($scope);
 
      this.credentials = {
        email: '',
        password: ''
      };
 
      this.error = '';
 
      this.login = () => {
        this.error = '';
        $ionicLoading.show({
          template: 'Logging in...'
        });
        var emailObj = {
          email: this.credentials.email
        }
        Meteor.loginWithPassword(emailObj, this.credentials.password, (err) => {
          $ionicLoading.hide();
          if (err) {
            console.log('LOGIN ERROR', err);
            this.error = 'Usuário e senha inválidos.';
          }
          else {
            $state.go('info');
          }
        });
      };
    }
  }
});