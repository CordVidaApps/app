angular.module("cordvida.mobile").directive('info', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-mobile/client/info/info.html',
    controllerAs: 'info',
    controller: function ($scope, $reactive, $state, $ionicPopup, BackgroundLocation) {
      $reactive(this).attach($scope);
      
      this.helpers({
        user: function () {
          return Meteor.user();
        }
      });

      this.subscribe('users');

      this.remainingDays = () => {
        if(!this.user) return;
        var rightNow = moment();
        var birthDate = moment(this.user.profile.estimateBornDate);
        return birthDate.diff(rightNow, 'days');
      };
    
      this.dayFormatted = () => {
        if(!this.user) return;
        moment.locale('pt');
        var birthDate = moment(this.user.profile.estimateBornDate);
        return birthDate.format('dddd DD/MM/YYYY');
      };

      this.userStatus = () => {
        if(!this.user) return;
        if(this.user.status === 'normal') return 'Normal';
        if(this.user.status === 'attention') return 'Atenção';
        if(this.user.status === 'urgency') return 'Urgente';
      }

      this.isStatusNormal = () => {
        if(!this.user) return;
        return this.user.status === 'normal';
      }

      this.isStatusAttention = () => {
        if(!this.user) return;
        return this.user.status === 'attention';
      }

      this.isStatusUrgency = () => {
        if(!this.user) return;
        return this.user.status === 'urgency';
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