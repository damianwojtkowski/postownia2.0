var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/postowniadb';
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

MongoClient.connect(url, function (err, db) {
  if (err) {
    return err;
  }
  console.log('Database created!');
  db.close();
});

app.delete('/deletepost/:postID', function (req, res) {
  fs.readFile('posts.json', function (err, content) {
    if (err) {
      return res.send(err);
    }
    var postID = req.params.postID;
    var posts = JSON.parse(content);
    posts.forEach(function (obj, index, array) {
      if (+postID === obj.postid) {
        array.splice(index, 1);
      }
    });
    var json = JSON.stringify(posts);
    fs.writeFileSync('posts.json', json);
    return res.send();
  });
});
// app.get('/posts', function (req, res) {
//   fs.readFile('posts.json', function (err, content) {
//     if (err) {
//       return res.send(err);
//     }
//     return res.send(content);
//   });
// });
app.get('/posts', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      return err;
    }
    db.collection('posts').find({}).toArray(function (err, result) {
      if (err) {
        return res.send(err);
      }
      return res.send(result);
    });
  });
});
app.post('/editContent', function (req, res) {
  fs.readFile('posts.json', function (err, content) {
    if (err) {
      return res.send(err);
    }
    var postID = req.body.postid
    var posts = JSON.parse(content);
    posts.forEach(function (obj, index, array) {
      if (postID === obj.postid) {
        var date = new Date();
        var newPost = {
          user: 'Damian',
          postdate: date,
          content: req.body.post,
          postid: date.getTime()
        }
        array[index] = newPost;
      }
    });
    var file = JSON.stringify(posts);
    fs.writeFileSync('posts.json', file);
    return res.send();
  });
});
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
    return res.send();
  });
});
app.get('/', function (req, res) {
	res.send('index.html');
});
app.listen(9876);

console.log('Server is running');
