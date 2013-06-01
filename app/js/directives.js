/*global $ */
'use strict';

/* Directives */


angular.module('chattyApp.directives', []).
    directive('server', function(socketService) {
         var $server = $("input.server");
        //link function
        return function(scope, element, attrs) {                        
            element[0].addEventListener('keypress', function (event) {
                if (event.which === 13) {
                    socketService.connect($server.val());
                }
            });
        };
    })
    .directive('chat', function(socketService) {
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
                    socketService.emit('message', {
                        name: name,
                        text: text,
                        timestamp: Math.round((new Date()).getTime() / 1000)
                    });
                    $chat.val('');
                }
            });
        };
    })
    .directive('message', function factory() {

        //TODO: Add colors
        var availableColors = ['DarkGray', 'Brown', 'DarkGreen', 'DarkSlateBlue', 'DarkSlateGray', 'IndianRed', 'LightSlateGray'],
        userColorMap = {},
        
        //private functions
        formatTime = function(timestamp) {
            return timestamp ? moment(new Date(timestamp * 1000)).format('MM-DD-YYYY @ h:mm:ss a') : '';
        };

        

        return function($scope, element, attrs) {
            var message = $scope.message;            
            element.html('<div class="message group ' + (message.name !== "" && message.text.indexOf(message.name) > -1 ? 'alert' : '') +'">' + (message.name ? '<div class="name">' +message.name + '</div>' : '') + '<div class="text"><span class="timestamp">' + formatTime(message.timestamp) + '</span>' + message.text + '</div></div>');

        }
    });



/* Directives */


// angular.module('myApp.directives', []).
//   directive('appVersion', ['version', function(version) {
//     return function(scope, elm, attrs) {
//       elm.text(version);
//     };
//   }]);