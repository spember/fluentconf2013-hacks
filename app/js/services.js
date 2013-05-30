namespace("chat.services");
(function (chat) {
    chat.services.messageService = function () {
        this.socket;
        //var socket, 
        this.messages = [];
        //connect,
        var self = this;
        this.connect = function(serverIp) {
          this.socket = io.connect('http://' + serverIp);
          this.socket.on('message', function (data) {
                
                //pre process for links
                var urlPattern = /(http|ftp|https):\/\/[\w\-]+(\.[\w\-]+)+([\w.,@?\^=%&amp;:\/~+#\-]*[\w@?\^=%&amp;\/~+#\-])?/,
                    match = urlPattern.exec(data.text);

                if (match !== null) {
                    data.text = data.text.replace(match[0], "<a href='" + match[0] + "' target='_blank'>" + match[0] +"</a>");
                }
                console.log("Adding message");
                self.messages.push(data);
                console.log("messages length: " +self.messages.length);
                
                
                //scrollToBottom();
            });
            this.socket.on('history', function (dataList) {
              self.messages.push(dataList);   
            }); 


            this.socket.on("connect", function () {
                console.log("connected!");
                console.log(self.socket);      
            });
        };
        this.emit = function (key, data) {
            self.socket.emit(key, data);
        };
    };
})(chat);
