angular.module("cordvida.mobile").directive('info', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-mobile/client/info/info.html',
    controllerAs: 'info',
    controller: function ($scope, $reactive, $state, $ionicPopup, BackgroundLocation) {
      $reactive(this).attach($scope);
 
      this.remainingDays = () => {
        var rightNow = moment();
        var birthDate = moment(Meteor.user().profile.estimateBornDate);
        return birthDate.diff(rightNow, 'days');
      };
    

      this.dayFormatted = () => {
        moment.locale('pt');
        var birthDate = moment(Meteor.user().profile.estimateBornDate);
        return birthDate.format('dddd DD/MM/YYYY');
      };

      this.showConfirmation = () => {
        var confirmPopup = $ionicPopup.show({
          title: 'Tem certeza?',
          template: 'Clique em confirmar e nossa equipe de coleta será ' +
            'notificada. Entraremos em contato em instantes.',
          scope: $scope,
          buttons: [
            { text: 'Cancelar' },
            {
              text: '<b>Confirmar</b>',
              type: 'button-assertive',
              onTap: function(e) {
                return true;
              }
            }
          ]
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('soar o alarme');
          } else {
            console.log('Alarme falso');
          }
        });
      };

      BackgroundLocation.init();

    }
  }
});