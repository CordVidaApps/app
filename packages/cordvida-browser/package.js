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
  api.use('angularui:angular-google-maps');
  api.use('angular:angular-material');
  api.use('planettraining:material-design-icons');
  api.use('less');
 
  api.addFiles([
    'client/lib/module.js',

    'client/styles/main.less',

    'client/auth/login/login.component.js',
    'client/auth/login/login.html',

    'client/users/users-list/users-list.component.js',
    'client/users/users-list/users-list.html',
    'client/users/user-item/user-item.component.js',
    'client/users/user-item/user-item.html',
    'client/users/user-details/user-details.component.js',
    'client/users/user-details/user-details.html',
    
    'client/users/new-users/new-users.component.js',
    'client/users/new-users/new-users.html',
    'client/users/edit-user/edit-user.component.js',
    'client/users/edit-user/edit-user.html',
    'client/users/new-users/user-form.component.js',
    'client/users/new-users/user-form.html',
    'client/users/new-users/styles/new-users.less',
    
    'client/users/styles/google-maps.css',

    'client/google-maps/google-maps.js',
    'client/home/home-cordvida.component.js',
    'client/home/home-cordvida.html',
    'client/home/styles/home-cordvida.less',

  ], 'web.browser');
});

 
Package.onTest(function(api) {
  api.use('tinytest');
  api.use('cordvida-browser');
});