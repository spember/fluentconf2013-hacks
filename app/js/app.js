/*global angular, rll */
$(function () {
            
    var $messages = $(".messages"), 
        $input = $("input.message-text"),
        $name = $("input.name"),
        $server = $("input.server"),
        urlPattern = /(http|ftp|https):\/\/[\w\-]+(\.[\w\-]+)+([\w.,@?\^=%&amp;:\/~+#\-]*[\w@?\^=%&amp;\/~+#\-])?/,
        socket,
        buildMessage = function(data) {
            //pre process for links
            match = urlPattern.exec(data.text);
            if (match !== null) {
                data.text = data.text.replace(match[0], "<a href='" + match[0] + "' target='_blank'>" + match[0] +"</a>");
            }
            return '<div class="message ' + ($name.val() !== "" && data.text.indexOf($name.val()) > -1 ? 'alert' : '') +'"><span class="name">' +data.name +':</span>' + data.text + '</div>';
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

        if(event.which == 13) {
            var text = $input.val(),
                name = $name.val();

            if(name === undefined || name === "") {
                name = "Anonymous";
            }
            localStorage.name = name;
            socket.emit('message', {
                name: name,
                text: text
            });
            $input.val('');
        }
    });

    $server.on('keypress', function (event) {
        if (event.which === 13) {
            socket = io.connect('http://' + $server.val());
            localStorage.server = $server.val();
            socket.on("connect", function () {
                socket.on('message', function (data) {
                    $messages.append(buildMessage(data));
                    scrollToBottom();
                }); 
                socket.on('history', function (dataList) {
                    var messages = "";
                    for(var i = 0; i < dataList.length; i++) {
                        messages += buildMessage(dataList[i]);
                    }
                    $messages.append(messages);
                    scrollToBottom();
                }); 
            });
            
            
        }
    });
});
