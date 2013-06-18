var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    os = require('os'),
    port = process.env.PORT || 4444;

io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
});

app.listen(port);

console.log("Grab your ip from here:");
console.log(os.networkInterfaces());

function handler(req, res) {
    if (req.url.indexOf("/app/") > -1) {
        fs.readFile(__dirname + '/..' + req.url, function (err, data) {
            if (req.url.indexOf("css") > -1) {
                res.setHeader('Content-Type', 'text/css');
            } else {
                res.setHeader('Content-Type', 'text/javascript');
            }

            res.writeHead(200);
            res.end(data);
        });
    } else {
        fs.readFile(__dirname + '/../app/index.html',
            function (err, data) {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading index.html');
                } else {
                    res.writeHead(200);
                    res.end(data);
                }
            });
    }
}

var messageHistory = {
    messages: [],
    maxHistory: 50,
    add: function (data) {
        this.messages.push(data);
        if (this.messages.length > this.maxHistory) {
            this.messages.shift();
        }
    },
    size: function () {
        return this.messages.length;
    }
};

// keep a running list of the current connections
var socketManager = {
    sockets: [],
    connectCount: 0,
    rooms : {
        'default' : []
    },
    add: function (socket) {
        this.sockets.push(socket);
        this.emit('count', {'count': this.sockets.length});
    },
    remove: function (socket) {
        for (var i = 0; i < this.sockets.length; i++) {
            if (this.sockets[i].id === socket.id) {
                this.sockets.splice(i, 1);
                console.log(this.sockets);
            }
        }
        this.emit('count', {'count': this.sockets.length});
    },
    emit: function (key, data) {
        console.log("emitting: " + key);
        for (var i = 0; i < this.sockets.length; i++) {
            this.sockets[i].emit(key, data);
        }

    },
    size: function () {
        return this.sockets.length;
    }
};

io.sockets.on('connection', function (socket) {
    socketManager.connectCount++;
    socketManager.add(socket);
    // welcome message
    socket.emit('message', { name: "Server", text: 'Welcome!'});

    //TODO isn't this going to emit the history to everyone everytime anyone connects?
    if (messageHistory.size() > 0) {
        socket.emit('history', messageHistory.messages);
    }

    if (socketManager.size() > -10) {
        socket.emit('count', {'count': socketManager.connectCount});
    }

    socket.emit('rooms', socketManager.rooms);

    socket.on('message', function (data) {
        messageHistory.add(data);
        socketManager.emit("message", data);
    });
    socket.on('disconnect', function (/*data*/) {
        socketManager.connectCount--;
        socketManager.remove(socket);
        socket.emit('count', {'count': socketManager.connectCount});
    });
});