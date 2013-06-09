function MainCtrl($scope, socketService) {

    $scope.socketService = socketService;
    $scope.$watch('socketService', function (data) {
        console.log('in socketService message watch:', data);
        $scope.messages = data.messages;
        $scope.count = data.numberOfConnections;
    }, true);


//    $scope.$watch('socketService.count', function (data) {
//        console.log('in socketService count watch:', data);
//        $scope.count = data;
//    }, true);
};
