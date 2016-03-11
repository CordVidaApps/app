angular.module("cordvida.mobile").directive('login', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-mobile/client/auth/login/login.html',
    controllerAs: 'login',
    controller: function ($scope, $reactive, $state, $ionicLoading, $ionicPopup) {
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

      this.resetPasswordEmail = '';

      this.forgotPassword = () => {
        console.log('forgot password link', this, $scope);
        
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          template: '<input class="reset-password-input" type="email" ng-model="login.resetPasswordEmail" placeholder="E-mail">',
          title: 'Alteração de Senha',
          subTitle: 'Por favor confirme seu e-mail que enviaremos ' + 
                    'instruções em seguida sobre como alterar sua senha.',
          scope: $scope,
          buttons: [
            { text: 'Cancelar' },
            {
              text: '<b>Enviar</b>',
              type: 'button-assertive',
              onTap: function(e) {
                console.log('onTap', $scope);
                if (!$scope.login.resetPasswordEmail) {
                  //don't allow the user to close unless he enters wifi password
                  e.preventDefault();
                } else {
                  return true;
                }
              }
            }
          ]
        });

        myPopup.then(function(res) {
          console.log('Tapped!', res);
          if(res) {
            $ionicLoading.show({
              template: 'Mandando e-mail de alteração de senha...'
            });
            Meteor.call('resetUserPassword', $scope.login.resetPasswordEmail, (err, res) => {
              if(err) {
                console.log('error reseting user password', err);
              }
              if(res) {
                console.log('reset password email sent');
                $ionicLoading.hide();
                this.resetPasswordEmailSent = true;
              }
            });
          }
        });
      }
    }
  }
});