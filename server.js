var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/posts', function (req, res) {
  fs.readFile('posts.json', function(err, content) {
    if (err) {
      return res.send(err);
    }
    return res.send(content);
  });
});

// app.get('*', function (req, res) {
//   res.sendFile('index.html', {root: __dirname + '/public'});
// });

app.get('/', function (req, res) {
	res.send('index.html');
});

app.listen(9876);

console.log('Server is running');
