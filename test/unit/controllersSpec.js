'use strict';

/* jasmine specs for controllers go here */
describe('ChattyChatChat Controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });


  beforeEach(module('socketService'));


  describe('MainCtrl', function() {
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      // $httpBackend = _$httpBackend_;
      // $httpBackend.expectGET('phones/phones.json').
      //     respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      ctrl = $controller(MainCtrl, {$scope: scope});
    }));


    it('test description', function() {
      expect(1).toEqual(1);
      console.log('aes');
      // $httpBackend.flush();

      expect(scope).toEqualData({});
    });

  });

});
