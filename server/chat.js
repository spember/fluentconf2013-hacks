var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs'),
	os = require('os');

app.listen(4444);
console.log(os.networkInterfaces());

function handler (req, res) {
	console.log(("" + req.url));

	if(req.url.indexOf("/lib/") > -1 || req.url.indexOf("/css/") > -1) {
		fs.readFile(__dirname +'/..' + req.url, function (err, data) {
			res.writeHead(200);
			res.end(data);
		});
	} else {
		fs.readFile(__dirname + '/../templates/chat/index.html',
			function (err, data) {
			    if (err) {
			      res.writeHead(500);
			      return res.end('Error loading index.html');
			    }

			    res.writeHead(200);
			    res.end(data);
	  	});	
	}
}
var sockets = [];
io.sockets.on('connection', function (socket) {
	console.log("Connect received");
	sockets.push(socket);
	console.log(sockets.length);
  socket.emit('message', { name: "Server",  text: 'Welcome' });
  socket.on('message', function (data) {
    for (var i = 0; i< sockets.length; i++) {
    	sockets[i].emit("message", data);	
    }
    
  });
});