/*global io */
'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('chattyApp', ['chattyApp.services', 'chattyApp.directives', 'LocalStorageModule']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {controller: MainCtrl});
        $routeProvider.otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
    }]);


app.run(["$rootScope", "localStorageService",
    function ($rootScope, localStorageService) {
        localStorageService.get('server');
           console.log('rootscope',$rootScope);
            console.log('localStorageService',localStorageService);
    }] );



//chattyApp.factory("socketService", chat.services.socketService);

//chattyApp.factory("Timer", function ($timeout) {
//    var data = { lastUpdated: new Date(), calls: 0 };
//
//    var updateTimer = function () {
//        data.lastUpdated = new Date();
//        data.calls += 1;
//        // console.log("updateTimer: " + data.lastUpdated);
//
//        $timeout(updateTimer, 5000);
//    };
//    updateTimer();
//
//    return {
//        data: data
//    };
//});


/*
$(function () {

    var $messages = $(".messages"),
        $input = $("input.message-text"),
        $name = $("input.name"),
        $server = $("input.server"),
        urlPattern = /(http|ftp|https):\/\/[\w\-]+(\.[\w\-]+)+([\w.,@?\^=%&amp;:\/~+#\-]*[\w@?\^=%&amp;\/~+#\-])?/,
        socket,
        availableColors = ['DarkGray', 'Brown', 'DarkGreen', 'DarkSlateBlue', 'DarkSlateGray', 'IndianRed', 'LightSlateGray'],
        userColorMap = {},
        formatTime = function (timestamp) {
            return timestamp ? moment(new Date(timestamp * 1000)).format('MM-DD-YYYY @ h:mm:ss a') : '';
        },
        buildMessage = function (data) {
            //pre process for links
            match = urlPattern.exec(data.text);
            if (match !== null) {
                data.text = data.text.replace(match[0], "<a href='" + match[0] + "' target='_blank'>" + match[0] + "</a>");
            }

            if (data.name && !userColorMap[data.name]) {
                userColorMap[data.name] = availableColors.pop();
            }

            return '<div class="message group ' + ($name.val() !== "" && data.text.toLowerCase().indexOf($name.val().toLowerCase()) > -1 ? 'alert' : '') + '">' + (data.name ? '<div class="name ' + userColorMap[data.name] + '">' + data.name + '</div>' : '') + '<div class="text"><span class="timestamp">' + formatTime(data.timestamp) + '</span>' + data.text + '</div></div>';
        },
        scrollToBottom = function () {
            $messages[0].scrollTop = $messages[0].scrollHeight - $messages[0].offsetHeight;
        },
        connectedServer,
        connectingToSocket;

    //look in localStorage for a previous name and server ip
    if (localStorage.name !== undefined) {
        $name.val(localStorage.name);
    }
    if (localStorage.server !== undefined) {
        $server.val(localStorage.server);
    }

    $input.on('keypress', function (event) {

        if (event.which == 13 && $input.val()) {
            var text = $input.val(),
                name = $name.val();

            if (name === undefined || name === "") {
                name = "Anonymous";
            }
            localStorage.name = name;
            socket.emit('message', {
                name: name,
                text: text,
                timestamp: Math.round((new Date()).getTime() / 1000)
            });
            $input.val('');
        }
    });

    $server.on('keypress', function (event) {
        var lastMessageName,
            lastHistoryName,
            interval,
            intervalCount,
            $count = $(".count"),
            serverAddress = $server.val();
        if (event.which === 13) {
            if (serverAddress !== connectedServer) {
                connectingToSocket = true;
                socket = io.connect('http://' + $server.val());
                localStorage.server = $server.val();

                socket.on('disconnect', function () {
                    connectingToSocket = false;
                    connectedServer = null;
                });

                socket.on("connect", function () {
                    connectingToSocket = false;
                    connectedServer = $server.val();

                    socket.on('message', function (data) {
                        var previousTitle = document.title;
                        clearInterval(interval);
                        intervalCount = 0;
                        $messages.append(buildMessage({
                            name: (lastMessageName == data.name) ? null : data.name,
                            text: data.text,
                            timestamp: data.timestamp
                        }));
                        interval = setInterval(function () {
                            document.title = "!!!!#*##*#*#*!!!!";
                            setTimeout(function () {
                                document.title = previousTitle;
                            }, 500);
                            intervalCount++;
                            if (intervalCount > 5) {
                                //suicide
                                clearInterval(interval);
                            }
                        }, 1000);
                        lastMessageName = data.name;
                        scrollToBottom();
                    });

                    socket.on('count', function (data) {
                        $count.text(data.count);
                    });

                    socket.on('history', function (dataList) {
                        var messages = "";
                        for (var i = 0; i < dataList.length; i++) {
                            messages += buildMessage({
                                name: (lastHistoryName == dataList[i].name) ? null : dataList[i].name,
                                text: dataList[i].text,
                                timestamp: dataList[i].timestamp
                            });
                            lastHistoryName = dataList[i].name;
                        }
                        $messages.append(messages);
                        scrollToBottom();
                    });

                });
            }
        }
    });
});

*/
