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
    httpBackend;

  beforeEach(inject(function(UserService,$httpBackend){
    svc = UserService;
    httpBackend = $httpBackend;
  }));

  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to fetch a list of all the users',function(){

    var users = [{"id":"1","username":"asd","email":"asd","created_at":"2013-12-02 15:46:28","updated_at":"2013-12-02 15:46:28"}];

    httpBackend.expectGET('/admin/user').respond(users);

    var result = svc.query();

    httpBackend.flush();

    expect(result[0].id).toBe(users[0].id);
    expect(result[0].username).toBe(users[0].username);

  });

});