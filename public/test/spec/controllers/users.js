/**
 * Created with JetBrains PhpStorm.
 * User: workzentre
 * Date: 12/2/13
 * Time: 8:50 AM
 * To change this template use File | Settings | File Templates.
 */
'use-strict';

describe('Controller: Users',function(){
  beforeEach(module('mainApp'));

  var UsersController,
    controller,
    httpBackend,
    scope;

  beforeEach(inject(function($controller,$rootScope,$httpBackend){
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    controller = $controller;
  }));




  //Nos aseguramos que no queden expectativas
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  it('should fetch a list of users',function(){
    httpBackend.expectGET('/admin/user').respond();
    UsersController = controller('UsersController',{
      $scope:scope
    });
    httpBackend.flush();
  });


});