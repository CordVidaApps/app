let modulesToLoad =  [
  'angular-meteor',
  'ui.router',
];

if (Meteor.isCordova) {
  modulesToLoad = modulesToLoad.concat(['cordvida.mobile']);
} else {
  modulesToLoad = modulesToLoad.concat(['cordvida.browser']);
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