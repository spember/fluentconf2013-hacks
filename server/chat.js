var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    os = require('os');

app.listen(4444);
console.log("Grab your ip from here:");
console.log(os.networkInterfaces());

function handler (req, res) {
    console.log(req.url);
    if(req.url.indexOf("/app/") > -1) {
        fs.readFile(__dirname +'/..' + req.url, function (err, data) {
            res.writeHead(200);
            res.end(data);
        });
    } else {
        fs.readFile(__dirname + '/../app/index.html',
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

var messageHistory = {
    messages: [{name: "Sample", text: "This is fake"}, {name: "Sample", text: "This is fake"}],
    maxHistory: 50,
    add: function(data) {
        this.messages.push(data);
        if(this.messages.length > this.maxHistory) {
            this.messages.pop(0);    
        }
    },
    size: function () {
        return this.messages.length;
    }
};

// keep a running list of the current connections
var sockets = [];

io.sockets.on('connection', function (socket) {
    console.log("Connect received! Number of connections = " + sockets.length);
    sockets.push(socket);
    // welcome message
    socket.emit('message', { name: "Server",  text: 'Welcome!'});
    if(messageHistory.size() > 0) {
        socket.emit('history', messageHistory.messages);
    }

    socket.on('message', function (data) {
        messageHistory.add(data);
        for (var i = 0; i< sockets.length; i++) {
            sockets[i].emit("message", data);   
        }
    });
});