var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/posts', function (req, res) {
  fs.readFile('posts.json', function (err, content) {
    if (err) {
      return res.send(err);
    }
    return res.send(content);
  });
});

// app.get('*', function (req, res) {
//   res.sendFile('index.html', {root: __dirname + '/public'});
// });

app.post('/newpost', function (req, res) {
  fs.readFile('posts.json', function (err, content) {
    if (err) {
      return res.send(err);
    }
    var json = JSON.parse(content);
    var obj = req.body;
    var content = obj.post;
    var date = new Date();
    var post = {
      user: 'Damian',
      postdate: date,
      content: content,
      postid: date.getTime()
    }
    json.push(post);
    var file = JSON.stringify(json);
    fs.writeFileSync('posts.json', file)
    return res.send()
  });
});

app.get('/', function (req, res) {
	res.send('index.html');
});

app.listen(9876);

console.log('Server is running');
