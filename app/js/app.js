'use strict'
var myModule = angular.module('chattyApp', ['chattyApp.directives']).
  config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
          controller:MainCtrl
        })
    		$routeProvider.otherwise({redirectTo: '/'});
  }]);
//TODO: Move to services.js
//Sets up the socket io connections


myModule.factory('messageUpdater', function() {

  var socket, 
  messages = [], 
  connect;

  return {
    connect : function(serverIp) {
      this.socket = io.connect('http://' + serverIp);
      this.socket.on("connect", function () {
        this.socket.on('message', function (data) {
          messages.push(data);
         // scrollToBottom();
        }); 
        this.socket.on('history', function (dataList) {
          messages.push(dataList);      
        }); 
      });
    }
  }
});



