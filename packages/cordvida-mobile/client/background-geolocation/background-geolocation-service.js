angular.module('cordvida.mobile').factory('BackgroundLocation', 
  function($rootScope, $meteor, $window){
    return {
      init: function(){
        /***** THIS SHOULD BE A SERVICE!! ************************************/
        /**
        * This callback will be executed every time a geolocation is recorded in the background.
        */
        var callbackFn = function(location) {
          console.log('[js] BackgroundGeoLocation callback:  ' + location);

          Meteor.call('insertLocation', location);

          $window.plugins.backgroundGeoLocation.finish();
        };

        var failureFn = function(error) {
          console.log('BackgroundGeoLocation error');
        };

        // BackgroundGeoLocation is highly configurable. See platform specific configuration options
        $window.plugins.backgroundGeoLocation.configure(callbackFn, failureFn, {
          desiredAccuracy: 10,
          stationaryRadius: 20,
          distanceFilter: 30,
          debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
          stopOnTerminate: false, // <-- enable this to clear background location settings when the app terminates
        });

        // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
        $window.plugins.backgroundGeoLocation.start();

        // If you wish to turn OFF background-tracking, call the #stop method.
        // $window.plugins.backgroundGeoLocation.stop();
        /*********************************************************************/
      },
    }
  }
);