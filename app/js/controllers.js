function MainCtrl($scope, messageUpdater) {
	$scope.messages = messageUpdater.messages;
	console.log($scope.messages);

	console.log(messageUpdater);
	$scope.$watch("messages", function (a, b) {
		console.log("changed! " +b +", " +a);
		console.log("messages are now: " +messageUpdater.messages);
	}, false);
};
