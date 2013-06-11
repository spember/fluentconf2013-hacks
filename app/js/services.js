'use strict';

/* Services */
angular.module('chattyApp.services', []).
    value('version', '0.1').
    factory('socket', function ($rootScope) {
        var socket;
        return {
            connect: function(serverIp) {
                var ip = 'http://' + serverIp;
                socket = io.connect(ip);
            },
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    });
