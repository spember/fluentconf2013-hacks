function MainCtrl($scope, socketService, Timer) {
	// $scope.messages = messageUpdater.messages;
	// console.log($scope.messages);

	// console.log(messageUpdater);
	// $scope.$watch("messages", function (a, b) {
	// 	console.log("changed! " +b +", " +a);
	// 	console.log("messages are now: " +messageUpdater.messages);
	// }, false);

$scope.socketService = socketService;
$scope.$watch('socketService', function (data) {
	console.log('in socketService watch:', data);
    $scope.messages = data.messages;
  }, true);


$scope.Timer = Timer;
$scope.$watch('Timer.data', function (data){
	// console.log("In $watch - data:", data);
	$scope.lastUpdated = data.lastUpdated;
	$scope.calls = data.calls;
}, true); // <-- don't forgt the true


};
