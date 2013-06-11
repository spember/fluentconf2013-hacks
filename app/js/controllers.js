function MainCtrl($scope, socket) {

    $scope.messages = [];
    $scope.connectionCount = 0;
    $scope.status = {message:"", type:''};

    $scope.connect = function (serverIp) {
        $scope.$apply(function() {
            socket.connect(serverIp);
            $scope.status = {message: 'Connected to: ' + serverIp + '!', type:'info'};
        });

        console.log("connected!");

        socket.on('message', function (payload) {
            //pre process for links
            var urlPattern = /(http|ftp|https):\/\/[\w\-]+(\.[\w\-]+)+([\w.,@?\^=%&amp;:\/~+#\-]*[\w@?\^=%&amp;\/~+#\-])?/,
                match = urlPattern.exec(payload.text);
            if (match !== null) {
                //TODO: HTML shouldn't be here.
                payload.text = payload.text.replace(match[0], "<a href='" + match[0] + "' target='_blank'>" + match[0] + "</a>");
            }
            $scope.messages.push(payload);
        });

        socket.on('history', function (dataList) {
            var i;
            console.log('Adding message history:', dataList);
            for (i = 0; i < dataList.length; i++) {
                $scope.messages.push(dataList[i]);
            }
        });

        socket.on('count', function (data) {
//            $scope.$apply(function() {
                $scope.connectionCount = data.count;
//            });
        });

    }
}
