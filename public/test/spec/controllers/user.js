/**
 * Created with JetBrains PhpStorm.
 * User: workzentre
 * Date: 11/27/13
 * Time: 8:39 AM
 * To change this template use File | Settings | File Templates.
 */

'use-strict';

describe('Controller: UsersController',function(){
  //Cargamos la aplicacion
  beforeEach(module('mainApp'));

  var UsersCtl,
    scope;

  beforeEach(inject(function($controller,$rootScope){
    scope = $rootScope.$new();

    UsersCtl = $controller('UsersCtl',{
      $scope:scope
    });

  }));

  it('should have a title',function(){
    expect(scope.title).toBe('Users List');
  })

});