/**
 * Created with JetBrains PhpStorm.
 * User: workzentre
 * Date: 12/3/13
 * Time: 8:21 AM
 * To change this template use File | Settings | File Templates.
 */

angular.module('mainApp')
  .controller('UsersController', function ($scope,UserService) {

    $scope.users = UserService.query();

  })
  .controller('UserController', function ($scope,UserService) {



  });