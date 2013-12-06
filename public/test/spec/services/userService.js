/**
 * Created with JetBrains PhpStorm.
 * User: workzentre
 * Date: 12/3/13
 * Time: 8:31 AM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

describe('Service: UserService',function(){

  beforeEach(module('mainApp'));

  var svc,
    httpBackend,
    mockUser,
    fetchUser;

  fetchUser = function(){
    httpBackend.expectGET('/admin/user/1').respond(mockUser);
    var user = svc.get({id:1});

    httpBackend.flush();

    return user;

  }

  beforeEach(inject(function(UserService,$httpBackend){
    svc = UserService;
    httpBackend = $httpBackend
    mockUser = {"id":"1","username":"asd","email":"asd","created_at":"2013-12-02 15:46:28","updated_at":"2013-12-02 15:46:28"};
  }));

  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to fetch a list of all the users',function(){

    var users = new Array();
    users.push(mockUser);

    httpBackend.expectGET('/admin/user').respond(users);

    var result = svc.query();

    httpBackend.flush();

    expect(result[0].id).toBe(users[0].id);
    expect(result[0].username).toBe(users[0].username);

  });

  it('should be able to fetch a single user',function(){

    var user = fetchUser();
    expect(user.username).toBe(mockUser.username);

  });

  it('should be able to create a new user',function(){
    var user = svc.new();
    user.username = mockUser.username;
    user.email = mockUser.email;

    httpBackend.expectPOST('/admin/user',user).respond(mockUser);
    var response;
    user.$save({},function(data){
      response = data;
    });
    httpBackend.flush();

    expect(response.username).toBe(user.username);
  });

  it('should be able to edit a fetched user',function(){
    var user = fetchUser();
    user.username = "new Username";
    user.email = "new Email";

    mockUser.username = user.username;
    mockUser.email = user.email;

    httpBackend.expectPUT('/admin/user/'+user.id,user).respond(mockUser);
    var response;
    user.$update({id:user.id},function(data){
      response = data;
    });
    httpBackend.flush();
    expect(response.username).toBe(user.username);
  });

  it('should be able to delete a fetched user',function(){
    var user = fetchUser();
    var message = {message:'DELETE OK'};

    httpBackend.expectDELETE('/admin/user/1').respond(message);
    var deleteUser;

    user.$delete({id:1},function(data){
      deleteUser = data;
    });

    httpBackend.flush();

    expect(deleteUser.message).toBe(message.message);

  });

});