namespace("chat.services");

chat.services.socketService = function () {

    var messages = [];
    var socket;

    return {
        connect: function (serverIp) {

            socket = io.connect('http://' + serverIp);
            socket.on('message', function (payload) {

                //pre process for links
                var urlPattern = /(http|ftp|https):\/\/[\w\-]+(\.[\w\-]+)+([\w.,@?\^=%&amp;:\/~+#\-]*[\w@?\^=%&amp;\/~+#\-])?/,
                    match = urlPattern.exec(payload.text);

                if (match !== null) {
                    payload.text = payload.text.replace(match[0], "<a href='" + match[0] + "' target='_blank'>" + match[0] + "</a>");
                }
                console.log("Adding message");
                messages.push(payload);
                console.log("messages length: " + messages.length);

            });
            socket.on('history', function (dataList) {
                var i;
                console.log('Adding message history:', dataList);
                for (i = 0; i < dataList.length; i++) {
                    messages.push(dataList[i]);
                }
            });

            socket.on("connect", function () {
                console.log("connected!");
            });
        },
        emit: function (key, data) {
            socket.emit(key, data);
        },
        messages: messages
    }
};
