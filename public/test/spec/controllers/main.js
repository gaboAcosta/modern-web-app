'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('mainApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    scope = $rootScope.$new();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(2);
  });

  it('should have a greeting',function(){
    expect(scope.greeting).toBe("Bienvenido a nuestra primera aplicación de Angular");
  });

  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });

});
