angular.module('cordvida.browser').factory('GoogleMaps', 
  function($q, $rootScope){
 
    var apiKey = 'AIzaSyCuBlpRagMzOoHdEssOdJSL6JxAlQvd5pU';
    var q;
    function initMap(){
      console.log('google maps loaded callback');
      enableMap();
    }
 
    function enableMap(){
      console.log('enable map');
      q.resolve(true);
    }
 
    function loadGoogleMaps(){
   
      //This function will be called once the SDK has been loaded
      window.mapInit = function(){
        initMap();
      };  
      console.log('************** before script tag');
      //Create a script element to insert into the page
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "googleMaps";
   
      //Note the callback function in the URL is the one we created above
      script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey + '&callback=mapInit&libraries=places';
      document.body.appendChild(script);

      console.log('************** after script tag');
    }
 
    return {
      init: function(){
        q = $q.defer();
        if(typeof google == "undefined" || typeof google.maps == "undefined" || 
            typeof google.maps.places == "undefined"){
          console.warn("Google Maps SDK needs to be loaded");
          loadGoogleMaps();
        }
        else {
          console.log('everything is fine');
          enableMap();
        }
        return q.promise;
      }
    }
  }
);