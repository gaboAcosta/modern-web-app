/**
 * Created with JetBrains PhpStorm.
 * User: workzentre
 * Date: 12/6/13
 * Time: 8:01 AM
 * To change this template use File | Settings | File Templates.
 */

describe('Controller: UserController',function(){
  beforeEach(module('mainApp'));

  var UserController,
    controller,
    scope,
    routeParams,
    httpBackend,
    mockUser;

  beforeEach(inject(function($controller,$rootScope,$httpBackend){
    controller = $controller;
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    mockUser = {"id":"1","username":"asd","email":"asd","created_at":"2013-12-02 15:46:28","updated_at":"2013-12-02 15:46:28"};
  }));

  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch an user if an id is given',function(){
    httpBackend.expectGET('/admin/user/1').respond(mockUser);

    routeParams = {id:1};

    UserController = controller('UserController',{
      $scope:scope , $routeParams:routeParams
    });

    httpBackend.flush();

    expect(scope.user.username).toBe(mockUser.username);
  });

  it('should be able to update a fetched user',function(){
    httpBackend.expectGET('/admin/user/1').respond(mockUser);

    routeParams = {id:1};

    UserController = controller('UserController',{
      $scope:scope , $routeParams:routeParams
    });

    httpBackend.flush();

    //When Send is triggered an update should occur

    httpBackend.expectPUT('/admin/user/'+scope.user.id,scope.user).respond(mockUser);

    scope.send();

    httpBackend.flush();

  });

  it('should be able to create a new user when ther is no id',function(){
    routeParams = {id:null};

    UserController = controller('UserController',{
      $scope:scope , $routeParams:routeParams
    });

    scope.user.username = "new User";
    scope.user.email = "a@a.com";
    httpBackend.expectPOST('/admin/user',scope.user).respond(mockUser);
    scope.send();
    httpBackend.flush();
  })




});