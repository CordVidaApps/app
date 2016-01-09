Package.describe({
  name: 'cordvida-browser',
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
  api.use('less');
 
  api.addFiles([
    'client/lib/module.js',

    'client/styles/main.less',

    'client/auth/login/login.component.js',
    'client/auth/login/login.html',

    'client/users/users-list/users-list.component.js',
    'client/users/users-list/users-list.html',
    'client/users/user-details/user-details.component.js',
    'client/users/user-details/user-details.html',
    'client/users/styles/google-maps.css',

    'client/home/home-cordvida.component.js',
    'client/home/home-cordvida.html',

  ], 'web.browser');
});

 
Package.onTest(function(api) {
  api.use('tinytest');
  api.use('cordvida-browser');
});