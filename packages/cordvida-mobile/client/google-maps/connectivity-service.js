angular.module('cordvida.mobile').factory('ConnectivityMonitor', 
  function($rootScope){
    return {
      isOnline: function(){
        return navigator.onLine;
      },
      isOffline: function(){
        return !navigator.onLine;
      }
    }
  }
);