angular.module('cordvida').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('users', {
      url: '/users',
      template: '<users-list></users-list>',
      resolve: {
        currentUser: ($q) => {
          if (Meteor.userId() == null) {
            return $q.reject('AUTH_REQUIRED');
          }
          else {
            return $q.resolve();
          }
        }
      }
    })
    .state('userDetails', {
      url: '/users/:userId',
      template: '<user-details></user-details>',
      resolve: {
        currentUser: ($q) => {
          if (Meteor.userId() == null) {
            return $q.reject('AUTH_REQUIRED');
          }
          else {
            return $q.resolve();
          }
        }
      }
    })
    .state('login', {
      url: '/login',
      template: '<login></login>'
    });

  $urlRouterProvider.otherwise("/users");
})
.run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });
});