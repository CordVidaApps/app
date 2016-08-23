angular.module('cordvida.browser').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('users', {
      url: '/users',
      template: '<users></users>',
    })
    .state('userDetails', {
      url: '/users/:userId',
      template: '<user-details></user-details>',
    })
    .state('editUser', {
      url: '/editUser/:userId',
      template: '<edit-user></edit-user>',
    })
    .state('newUsers', {
      url: '/newUsers',
      template: '<new-users></new-users>',
      resolve: {
        currentUser: ($q) => {
          console.log('%%%%%%%%%%% RESOLVE FUNCTION');
            return $q.resolve();
        }
      }
    })
    .state('enroll-account', {
      url: '/enroll-account/:token',
      template: '<reset-password></reset-password>',
    })
    .state('reset-password', {
      url: '/reset-password/:token',
      template: '<reset-password></reset-password>',
    })
    .state('password-reset-success', {
      url: '/password-reset-success',
      template: '<reset-password-success></reset-password-success>',
    })

  $urlRouterProvider.otherwise("/users");
});
