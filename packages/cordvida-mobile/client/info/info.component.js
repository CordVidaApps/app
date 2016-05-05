angular.module("cordvida.mobile").directive('info', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-mobile/client/info/info.html',
    controllerAs: 'info',
    controller: function ($scope, $reactive, $state, $ionicPopup, BackgroundLocation, GoogleMaps) {
      $reactive(this).attach($scope);
      
      this.helpers({
        user: function () {
          return Meteor.user();
        }
      });

      this.subscribe('users');

      this.remainingDays = () => {
        if(!this.user) return;
        var rightNow = moment().startOf('day');
        var birthDate = moment(this.user.profile.estimateBornDate);
        var difference = birthDate.diff(rightNow, 'days');
        if(difference < 0) return 0;
        return difference;
      };
    
      this.dayFormatted = () => {
        if(!this.user) return;
        moment.locale('en', {
          weekdays : "Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado".split("_"),
        });
        var birthDate = moment(this.user.profile.estimateBornDate);
        return birthDate.format('dddd DD/MM/YYYY');
      };

      this.userStatus = () => {
        if(!this.user) return;
        if(this.user.profile.status === 'normal') return 'Normal';
        if(this.user.profile.status === 'attention') return 'Atenção';
        if(this.user.profile.status === 'urgency') return 'Urgente';
      }

      this.userMaternityAddress = () => {
        if(!this.user) return;
        return this.user.profile.maternityAddress;
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

      this.hasConfirmationTime = () => {
        if(!this.user) return false;
        if(!this.user.profile.confirmationTime) return false;
        return true;
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
            Meteor.call('chanceToEmergencyStatus', (err, res) => {
              if(err) {
                console.log('erro ao mudar status', err);
              }
              if(res) {
                console.log('mudança de status bem-sucedida', res);
              }
            });
          } else {
            console.log('Alarme falso');
          }
        });
      };

      this.showFalseAlarmConfirmation = () => {
        var confirmPopup = $ionicPopup.show({
          title: 'Tem certeza que está indo para a maternidade?',
          template: 'Se o momento do parto chegou, clique em “Confirmar”' + 
                    ' que a Central de Coletas da CordVida será notificada' + 
                    ' e entrará em contato em seguida.',
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
            Meteor.call('falseAlarm', (err, res) => {
              if(err) {
                console.log('erro ao mudar status', err);
              }
              if(res) {
                console.log('mudança de status bem-sucedida', res);
              }
            });
          } else {
            console.log('cancelar');
          }
        });
      };

      BackgroundLocation.init();

      this.createMap = () => {
        console.log("USER:", this.user);
        var u = this.getReactively('user');
        if(!u) return;

        var hospCenter = this.user.profile.maternityLocation;
        console.log('--------- hospCenter', hospCenter);
        var hospLatLng = new google.maps.LatLng(hospCenter.latitude,hospCenter.longitude);

        var mapOptions = {
            center: hospLatLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            draggable: false,
            scrollwheel: false,
        };

        var hospMap = new google.maps.Map(document.getElementById("hospMap"), mapOptions);

        this.hospMap = hospMap;
        //Wait until the map is loaded
        google.maps.event.addListenerOnce(this.hospMap, 'idle', () => {
          var marker = new google.maps.Marker({
              map: this.hospMap,
              animation: google.maps.Animation.DROP,
              position: hospLatLng
          });      
        });
      };

      GoogleMaps.init().then(
        (res) => {
          console.log('google maps iniciado com sucesso', res);
          this.createMap();
        }, 
        (err) => {
          console.log('erro init google maps', err);
        }
      );

    }
  }
});