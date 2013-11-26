'use strict';

angular.module('mainApp')
  .controller('MainCtrl', function ($scope) {

    $scope.greeting = "Bienvenido a nuestra primera aplicación de Angular";

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS'
    ];
  });
