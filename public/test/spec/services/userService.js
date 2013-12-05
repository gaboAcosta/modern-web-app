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

  beforeEach(inject(function(UserService,$httpBackend){
    svc = UserService;
    httpBackend = $httpBackend;
    mockUser = {"id":"1","username":"asd","email":"asd","created_at":"2013-12-02 15:46:28","updated_at":"2013-12-02 15:46:28"};
  }));

  fetchUser = function(){
    httpBackend.expectGET('/admin/user/1').respond(mockUser);
    var user = svc.get({id:1});

    httpBackend.flush();
    return user;
  }

  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to fetch a list of all the users',function(){

    var users = [];
    users.push(mockUser);

    httpBackend.expectGET('/admin/user').respond(users);

    var result = svc.query();

    httpBackend.flush();

    expect(result[0].id).toBe(users[0].id);
    expect(result[0].username).toBe(users[0].username);

  });

  it('should retrieve an user',function(){


    var user = fetchUser();

    expect(user.id).toBe("1");
  });


  it('Should be able to edit an user',function(){
    var user = fetchUser();
    user.id = mockUser.id;
    user.username = mockUser.username;
    user.email = mockUser.email;
    user.password = "asd";

    httpBackend.expectPUT('/admin/user/'+user.id, user ).respond(mockUser);

    user.$update();

    httpBackend.flush();

  });

  it('Should be able to create a new user',function(){
    var user = svc.new();
    user.username = mockUser.username;
    user.email = mockUser.email;

    httpBackend.expectPOST('/admin/user',user).respond(mockUser);

    user.$save();

    httpBackend.flush();
  });

  it('Should be able to destroy an existing user',function(){
    var user = fetchUser();

    httpBackend.expectDELETE('/admin/user/'+user.id).respond({message:'DELETE OK'});

    user.$delete();

    httpBackend.flush();
  });

});