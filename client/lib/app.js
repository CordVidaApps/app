let modulesToLoad =  [
  'angular-meteor',
  'ui.router',
  'uiGmapgoogle-maps',
  'ngMaterial',
];

if (Meteor.isCordova) {
  modulesToLoad = modulesToLoad.concat(['cordvida.mobile']);
}

angular.module('cordvida', modulesToLoad);

function onReady() {
  angular.bootstrap(document, ['cordvida'], {
    strictDi: true
  });
}
 
if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);