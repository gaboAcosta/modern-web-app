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
      .when('/users', {
        templateUrl: '/app/views/users.html',
        controller: 'UsersController'
      })
      .when('/user/:id', {
        templateUrl: '/app/views/user.html',
        controller: 'UserController'
      })
      .when('/user/:id/delete', {
        templateUrl: '/app/views/user_delete.html',
        controller: 'UserController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
