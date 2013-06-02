// namespace("chat.services");
// chat.services.socketService = function () {

//     var self = this; 
//     self.data = {messages:[]};

//     return {
//         connect : function(serverIp) {

//             this.socket = io.connect('http://' + serverIp);
//             this.socket.on('message', function (data) {

//                 //pre process for links
//                 var urlPattern = /(http|ftp|https):\/\/[\w\-]+(\.[\w\-]+)+([\w.,@?\^=%&amp;:\/~+#\-]*[\w@?\^=%&amp;\/~+#\-])?/,
//                     match = urlPattern.exec(data.text);

//                 if (match !== null) {
//                     data.text = data.text.replace(match[0], "<a href='" + match[0] + "' target='_blank'>" + match[0] +"</a>");
//                 }
//                 console.log("Adding message");
//                 self.data.messages.push(data);
//                 console.log("messages length: " +self.data.messages.length);


//                 //scrollToBottom();
//             });
//             this.socket.on('history', function (dataList) {
//               self.data.messages.push(dataList);   
//             }); 


//             this.socket.on("connect", function () {
//                 console.log("connected!");
//                 console.log(self.socket);      
//             });
//         },
//         emit : function (key, data) {
//             this.socket.emit(key, data);
//         },
//         data : self.data
//     }
// };
