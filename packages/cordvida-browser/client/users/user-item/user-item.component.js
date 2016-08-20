angular.module('cordvida.browser').directive('userItem', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/user-item/user-item.html',
    controllerAs: 'userItem',
    scope: {
      user: '='
    },
    controller: function($scope, $reactive, $state, $mdDialog) {
      $reactive(this).attach($scope);
    
      this.helpers({
        user: function () {
          return $scope.user;
        }
      });

      this.goToUser = () => {
        $state.go('userDetails', {userId: this.user._id});
      };

      this.goToEditPage = () => {
        console.log('going to edit user page');
        $state.go('editUser', {userId: this.user._id});
      }

      this.removeUser = () => {
        console.log('remove user', $scope);
        this.showRemovePrompt();
      }

      this.resendWelcomeEmail = (ev) => {
        console.log('resending e-mail');
        Meteor.call('resendWelcomeEmail', this.user._id, (error) => {
          if (error) {
            console.error('Oops, unable to resend email!');
          } else {
            console.log('email sent')
            this.showAlert(ev);
          }
        });
      }

      this.showAlert = () => {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Usuario removido')
            .textContent('')
            .ok('Voltar')
        );
      };

      this.showRemovePrompt = () => {
        confirmDialog = $mdDialog.confirm()
          .title('Atenção')
          .textContent(`Confirme para excluir ${$scope.user.profile.name} da lista de usuarios.`)
          .cancel('Cancelar')
          .ok('Remover');
        $mdDialog
          .show( confirmDialog )
          .then(
            () => {
              console.log('success');
              confirmDialog = undefined;
              Meteor.call('removeUser', this.user._id, (error) => {
                if (error) {
                  console.error('error - show error alert');
                  $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Ocorreu um erro')
                    .textContent('Não foi possivel remover o usuario. Tente novamente. Se o erro persistir entre em contato com o suporte.')
                    .ok('Voltar')
                  );
                } else {
                  console.log('email sent')
                  this.showAlert();
                }
              });
            },
            () => {
              console.log('cancelled');
              confirmDialog = undefined;
            }
          );
      
    }

      this.userStatus = () => {
        return this.user && this.user.profile.status;
      }

      this.isStatusNormal = () => {
        if(!this.user) return;
        return this.user.profile.status === 'normal';
      }

      this.isStatusAttention = () => {
        if(!this.user) return;
        return this.user.profile.status === 'attention';
      }

      this.isStatusUrgency = () => {
        if(!this.user) return;
        return this.user.profile.status === 'urgency';
      }

      this.estimateBornDate = () => {
        return this.user && moment(this.user.profile.estimateBornDate).format('DD/MM/YYYY');
      };

      this.timeFromLastLocation = () => {
        if(!this.user || !this.user.lastLocationTime) return '---';
        return moment(this.user.lastLocationTime).fromNow();
      }

      this.aggregatedScore = () => {
        if(!this.user || !this.user.aggregatedScore) return 0;
        return this.user.aggregatedScore.toFixed(2);
      }
    }
  }
});