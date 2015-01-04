'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('AngularBusinessTemplate', [
  'ionic', 
  'config', 
  'abt.users'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    abstract: true,
    templateUrl: 'templates/menu.html'
  })
    .state('app.users', {
      abstract: true,
      views: {
        'menuContent':{
          template: '<ion-nav-view></ion-nav-view>'
        }
      }
    })
      .state('app.users.list', {
        url: '/users',
        views: {
          '': {
              templateUrl: 'templates/users.html',
              controller: 'UsersCtrl'
          }
        }
      })
      .state('app.users.details', {
        url: '/user/:userId',
        views: {
          '': {
              templateUrl: 'templates/userDetails.html',
              controller: 'UserDetailsCtrl'
          }
        }
      })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/users');
});

