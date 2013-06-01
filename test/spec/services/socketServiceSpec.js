var mock, notify;

beforeEach(function() {
  mock = {alert: jasmine.createSpy()};

  module(function($provide) {
    $provide.value('$window', mock);
  });

  inject(function($injector) {
    notify = $injector.get('notify');
  });
});

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){     
   		expect([1,2,3].indexOf(5)).toBe(-1);      
      	expect([1,2,3].indexOf(0)).toBe(-1);
    })
  })
});


describe('SocketService', function() {


});
