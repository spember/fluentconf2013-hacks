/*global angular, rll */
$(function () {
            
    var $messages = $(".messages"), 
        $input = $("input.message-text"),
        $name = $("input.name"),
        $server = $("input.server"),
        urlPattern = /(http|ftp|https):\/\/[\w\-]+(\.[\w\-]+)+([\w.,@?\^=%&amp;:\/~+#\-]*[\w@?\^=%&amp;\/~+#\-])?/,
        socket,
        availableColors = ['DarkGray', 'Brown', 'DarkGreen', 'DarkSlateBlue', 'DarkSlateGray', 'IndianRed', 'LightSlateGray'],
        userColorMap = {},
        formatTime = function(timestamp) {
            return timestamp ? moment(new Date(timestamp * 1000)).format('MM-DD-YYYY @ h:mm a') : '';
        },
        buildMessage = function(data) {
            //pre process for links
            match = urlPattern.exec(data.text);
            if (match !== null) {
                data.text = data.text.replace(match[0], "<a href='" + match[0] + "' target='_blank'>" + match[0] +"</a>");
            }

            if(data.name && !userColorMap[data.name]) {
                userColorMap[data.name] = availableColors.pop();
            }

            return '<div class="message group ' + ($name.val() !== "" && data.text.indexOf($name.val()) > -1 ? 'alert' : '') +'">' + (data.name ? '<div class="name ' + userColorMap[data.name] + '">' +data.name + '</div>' : '') + '<div class="text">' + data.text + '<span class="timestamp">' + formatTime(data.timestamp) + '</span></div></div>';
        },
        scrollToBottom = function() {
            $messages[0].scrollTop = $messages[0].scrollHeight - $messages[0].offsetHeight;
        };

    //look in localStorage for a previous name and server ip
    if (localStorage.name !== undefined) {
        $name.val(localStorage.name);
    }
    if (localStorage.server !== undefined) {
        $server.val(localStorage.server);
    }

    $input.on('keypress', function(event){

        if(event.which == 13 && $input.val()) {
            var text = $input.val(),
                name = $name.val();

            if(name === undefined || name === "") {
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
            lastHistoryName;
        if (event.which === 13) {
            socket = io.connect('http://' + $server.val());
            localStorage.server = $server.val();
            socket.on("connect", function () {
                socket.on('message', function (data) {
                    $messages.append(buildMessage({
                        name: (lastMessageName == data.name) ? null : data.name,
                        text: data.text,
                        timestamp: data.timestamp
                    }));
                    lastMessageName = data.name;
                    scrollToBottom();
                }); 
                socket.on('history', function (dataList) {
                    var messages = "";
                    for(var i = 0; i < dataList.length; i++) {
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
    });
});
