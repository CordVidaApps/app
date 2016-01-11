angular.module('cordvida').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('users', {
      url: '/users',
      template: '<users-list></users-list>',
    })
    .state('userDetails', {
      url: '/users/:userId',
      template: '<user-details></user-details>',
    })
    .state('login', {
      url: '/login',
      template: '<login></login>'
    })
    .state('info', {
      url: '/info',
      template: '<info></info>',
      resolve: {
        currentUser: ($q) => {
          console.log('%%%%%%%%%%% RESOLVE FUNCTION');
          if (Meteor.userId() == null) {
            return $q.reject('AUTH_REQUIRED');
          }
          else {
            return $q.resolve();
          }
        }
      }
    });

  $urlRouterProvider.otherwise("/info");
})
.run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });
});