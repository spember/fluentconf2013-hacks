'use strict';

/* Directives */


angular.module('chattyApp.directives', []).
	directive('server', function(messageUpdater) {
		 var $server = $("input.server");
		//link function
		return function(scope, element, attrs) {						
			element[0].addEventListener('keypress', function (event) {
			    if (event.which === 13) {
			        messageUpdater.connect($server.val());
			    }
			});
		};
	});



/* Directives */


// angular.module('myApp.directives', []).
//   directive('appVersion', ['version', function(version) {
//     return function(scope, elm, attrs) {
//       elm.text(version);
//     };
//   }]);