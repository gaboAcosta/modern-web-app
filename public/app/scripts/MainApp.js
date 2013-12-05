'use strict';

angular.module('mainApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/user', {
        templateUrl: '/app/views/user.html',
        controller: 'UsersController'
      })
      .when('/user/:id', {
        templateUrl: '/app/views/users.html',
        controller: 'UserController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
