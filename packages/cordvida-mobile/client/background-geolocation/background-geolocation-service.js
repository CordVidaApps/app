angular.module('cordvida.mobile').factory('BackgroundLocation', 
  function($rootScope, $meteor, $window){
    return {
      init: function(){
        console.log("INITING BG GEOLOC");
        var bgGeo = window.BackgroundGeolocation;

        /**
        * This callback will be executed every time a geolocation is recorded in the background.
        */
        var callbackFn = function(location, taskId) {
            var coords = location.coords;
            var lat    = coords.latitude;
            var lng    = coords.longitude;

            // Simulate doing some extra work with a bogus setTimeout.  This could perhaps be an Ajax request to your server.
            // The point here is that you must execute bgGeo.finish after all asynchronous operations within the callback are complete.
            setTimeout(function() {
              bgGeo.finish(taskId); // <-- execute #finish when your work in callbackFn is complete
            }, 1000);
        };

        var failureFn = function(error) {
            console.log('BackgroundGeoLocation error', error);
        }

        // BackgroundGeoLocation is highly configurable.
        bgGeo.configure(callbackFn, failureFn, {
            // Geolocation config
            desiredAccuracy: 10,
            stationaryRadius: 50,
            distanceFilter: 25,
            disableElasticity: false, // <-- [iOS] Default is 'false'.  Set true to disable speed-based distanceFilter elasticity
            locationUpdateInterval: 5000,
            minimumActivityRecognitionConfidence: 80,   // 0-100%.  Minimum activity-confidence for a state-change 
            fastestLocationUpdateInterval: 5000,
            activityRecognitionInterval: 10000,
            stopDetectionDelay: 1,   // [iOS] delay x minutes before entering stop-detection mode
            stopTimeout: 2,  // Stop-detection timeout minutes (wait x minutes to turn off tracking)
            activityType: 'AutomotiveNavigation',

            // Application config
            debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
            forceReloadOnLocationChange: false,  // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a new location is recorded (WARNING: possibly distruptive to user) 
            forceReloadOnMotionChange: false,    // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when device changes stationary-state (stationary->moving or vice-versa) --WARNING: possibly distruptive to user) 
            forceReloadOnGeofence: false,        // <-- [Android] If the user closes the app **while location-tracking is started** , reboot app when a geofence crossing occurs --WARNING: possibly distruptive to user) 
            stopOnTerminate: false,              // <-- Don't stop tracking when user closes app.
            startOnBoot: true,                   // <-- [Android] Auto start background-service in headless mode when device is powered-up.

            // HTTP / SQLite config
            url: 'http://app.cordvida.com.br/sendLocations',
            method: 'POST',
            batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
            autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
            maxDaysToPersist: 1,    // <-- Maximum days to persist a location in plugin's SQLite database when HTTP fails
            headers: {
                "X-FOO": "bar"
            },
            params: {
                "auth_token": Meteor.userId(),
            }
        });

        // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
        bgGeo.start();

        // If you wish to turn OFF background-tracking, call the #stop method.
        // bgGeo.stop()
      },
    }
  }
);