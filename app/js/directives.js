/*global $ */
'use strict';

/* Directives */


angular.module('chattyApp.directives', ['LocalStorageModule']).
    directive('server', function (socketService) {
        var $server = $("input.server");
        //link function
        return function (scope, element, attrs) {
            element[0].addEventListener('keypress', function (event) {
                if (event.which === 13) {
                    socketService.connect($server.val());
                }
            });
        };
    })
    .directive('chat', function (socketService, localStorageService) {
        var $chat = $("input.message-text"),
            $name = $("input.name");
        return function ($scope, element, attrs) {
            $chat.on('keypress', function (event) {
                if (event.which == 13 && $chat.val()) {
                    var text = $chat.val(),
                        name = $name.val();

                    if (name === undefined || name === "") {
                        name = "Anonymous";
                    }
                    localStorageService.set(name, name);
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

        var availableColors = ['DarkGray', 'Brown', 'DarkGreen', 'DarkSlateBlue', 'DarkSlateGray', 'IndianRed', 'LightSlateGray'],
            userColorMap = {},
            directiveDefinitionObject,

        //private functions
            formatTime = function (timestamp) {
                return timestamp ? moment(new Date(timestamp * 1000)).format('MM-DD-YYYY @ h:mm:ss a') : '';
            };
        directiveDefinitionObject = {

            restrict: 'E',

            link: function ($scope, element, attrs) {
                var message = $scope.message;

                if (message.name && !userColorMap[message.name]) {
                    userColorMap[message.name] = availableColors.pop();
                }

                element.html('<div class="message group ' + (message.name !== "" && message.text.indexOf(message.name) > -1 ? 'alert' : '') + '">' + (message.name ? '<div class="name ' + userColorMap[message.name] + '">' + message.name + '</div>' : '') + '<div class="text"><span class="timestamp">' + formatTime(message.timestamp) + '</span>' + message.text + '</div></div>');

            }
        }
        return directiveDefinitionObject;
    })
    .directive('scrollAnchor', function scrollAnchorFactory() {
        var messageTextArea = $('.messages')[0];
        return function ($scope, element, attrs) {
            messageTextArea.scrollTop = messageTextArea.scrollHeight - messageTextArea.offsetHeight;
        }
    })
;