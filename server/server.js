var express = require('express'),
    fs = require('fs'),
    app = express(),
    port = 4444,
    staticDir = express['static'];

app.configure( function () {
  //app.register('.html', require('jade'));
  [ 'app', 'lib', 'templates'].forEach(function(dir) {
      app.use('/' + dir, staticDir("./" + dir));
    });
    app.use(express.bodyParser());
});


app.get('/', function(req, res) {
  fs.createReadStream('./templates/index.html').pipe(res);
});

app.get('/book', function(req, res) {
  fs.createReadStream('./templates/bookshelf/index.html').pipe(res);
});

app.listen(port);
console.log("Listening on localhost:" + port);