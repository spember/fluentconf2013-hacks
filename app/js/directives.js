/*global $ */
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
    })
    .directive('chat', function(messageUpdater) {
        var $chat = $("input.message-text"),
            $name = $("input.name");
        return function($scope, element, attrs) {
            $chat.on('keypress', function(event){
                if(event.which == 13 && $chat.val()) {
                    var text = $chat.val(),
                        name = $name.val();

                    if(name === undefined || name === "") {
                        name = "Anonymous";
                    }
                    localStorage.name = name;
                    messageUpdater.emit('message', {
                        name: name,
                        text: text,
                        timestamp: Math.round((new Date()).getTime() / 1000)
                    });
                    $chat.val('');
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