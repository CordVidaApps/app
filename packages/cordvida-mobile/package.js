Package.describe({
  name: 'cordvida-mobile',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('angular');
  api.use('driftyco:ionic');
  api.use('momentjs:moment');
  api.use('less');

  api.addFiles([
    'client/lib/module.js',

    'client/styles/main.less',
    'client/routes.js',
    'client/google-maps/google-maps-service.js',
    'client/google-maps/connectivity-service.js',

    'client/background-geolocation/background-geolocation-service.js',

    'client/auth/login/login.component.js',
    'client/auth/login/login.html',
    'client/auth/login/styles/login.less',
    'client/home/home-cordvida.component.js',
    'client/home/home-cordvida.html',
    'client/info/info.component.js',
    'client/info/info.html',
    'client/info/styles/info.less',
  ], 'web.cordova');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('cordvida-mobile');
});

Cordova.depends({
    'cordova-plugin-network-information': '1.1.0',
    'cordova-plugin-mauron85-background-geolocation': '0.7.3'
});
