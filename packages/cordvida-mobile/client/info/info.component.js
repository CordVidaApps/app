angular.module("cordvida.mobile").directive('info', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-mobile/client/info/info.html',
    controllerAs: 'info',
    controller: function ($scope, $reactive, $state, $ionicPopup, BackgroundLocation) {
      $reactive(this).attach($scope);
      
      this.subscribe('users');

      this.remainingDays = () => {
        if(!Meteor.user()) return;
        var rightNow = moment();
        var birthDate = moment(Meteor.user().profile.estimateBornDate);
        return birthDate.diff(rightNow, 'days');
      };
    

      this.dayFormatted = () => {
        if(!Meteor.user()) return;
        moment.locale('pt');
        var birthDate = moment(Meteor.user().profile.estimateBornDate);
        return birthDate.format('dddd DD/MM/YYYY');
      };

      this.isStatusUrgency = () => {
        if(!Meteor.user()) return;
        return Meteor.user().status === 'urgency';
      }

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
            Meteor.call('chanceToEmergencyStatus');
          } else {
            console.log('Alarme falso');
          }
        });
      };

      this.showFalseAlarmConfirmation = () => {
        var confirmPopup = $ionicPopup.show({
          title: 'Tem certeza?',
          template: 'Clique em confirmar para caso realmente seja um alarme falso.',
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
            Meteor.call('falseAlarm');
          } else {
            console.log('cancelar');
          }
        });
      };

      BackgroundLocation.init();

    }
  }
});