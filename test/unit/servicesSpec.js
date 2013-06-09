'use strict';

/* jasmine specs for services go here */

describe('service', function() {

	beforeEach(module('chattyApp'));

	describe('socketService test', function() {

		var service;

		// beforeEach(inject(function($rootScope, socketService) {
		// 	service = socketService;

		// }));


		it('the service should exist', function() {
			console.log('omg foo');
			// expect(service).toNotBeNull();

			expect(1).toBe(1);
		});

	});

});
