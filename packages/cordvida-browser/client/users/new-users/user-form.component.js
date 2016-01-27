angular.module('cordvida.browser').directive('userForm', function() {
  return {
    restrict: 'E',
    templateUrl: '/packages/cordvida-browser/client/users/new-users/user-form.html',
    controllerAs: 'userForm',
    scope: {
      user: '=?'
    },
    controller: function($scope, $state, $reactive, GoogleMaps) {
      $reactive(this).attach($scope);
      
      if(!$scope.user) {
        console.log('&&&&&&&&&&& user undefined!');
        this.createUserForm = true;
        this.user = {
          email: '',
          password: '',
          profile: {
            name: '',
            status: 'normal', 
            estimateBornDate: new Date(),
            maternityLocation: '',
            maternityAddress: ''
          }
        }
      } else {
        this.user = $scope.user;
        this.editUserForm = true;
        console.log('&&&&&&&&&&& user defined!', this.user);
      }

      this.saveUser = () => {
        console.log('saving user', this.user);
        Accounts.createUser(this.user, (err) => {
          if(err) {
            console.log('save user error', err);
          } else {
            console.log('user saved success');
            Meteor.call('sendWelcomeEmail', this.user.email);
            $state.go('users');
          }
        })
      }

      this.editUser = () => {
        console.log('editing user', this.user);
        Meteor.call('editUser', this.user, (err, result) => {
          if(err) {
            console.log('error editing', err);
          }
          if(result) {
            console.log('editing successful', result);
            $state.go('users');
          }
        });
      }

      this.initMap = (lat, lng, zoom) => {
        var latLng = new google.maps.LatLng(lat, lng);
          var mapOptions = {
            center: latLng,
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
        this.map = new google.maps.Map(document.getElementById("new-user-map"), mapOptions);
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          var marker = new google.maps.Marker({
              map: this.map,
              animation: google.maps.Animation.DROP,
              position: latLng
          });
        });
      }

      this.initAutocomplete = () => {
        var addressInput = document.getElementById('addressInput');
        var autocomplete = new google.maps.places.Autocomplete(addressInput);
        autocomplete.addListener('place_changed', () => {
          console.log('autocomplete listener');
          var place = autocomplete.getPlace();
          console.log('PLACE:', place);
          console.log('place coords', place.geometry.location.lat(), 
            place.geometry.location.lng());

          this.user.profile.maternityAddress = place.formatted_address;
          this.user.profile.maternityLocation = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          }

          this.initMap(this.user.profile.maternityLocation.latitude, 
            this.user.profile.maternityLocation.longitude, 15);
        });
      }

      GoogleMaps.init().then(
        (res) => {
          console.log('google maps iniciado com sucesso', res);
          this.mapsEnabled = true;
          if(this.createUserForm){
            this.initMap(-15.7833, -47.8667, 4);
          } else if(this.editUserForm) {
            this.initMap(this.user.profile.maternityLocation.latitude, 
              this.user.profile.maternityLocation.longitude, 15);
          }
          this.initAutocomplete();
        }, 
        (err) => {
          console.log('erro init google maps', err);
        }
      );

    }
  }
});