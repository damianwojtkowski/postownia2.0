var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/postowniadb';
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

MongoClient.connect(url, function (err, db) {
  if (err) {
    return err;
  }
  db.close();
});
app.delete('/deletepost/:postID', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      return err;
    }
    var deletedPostID = req.params.postID;
    var deletedPost = {_id: new mongodb.ObjectID(deletedPostID)};
    db.collection('posts').deleteOne(deletedPost, function (err, obj) {
      if (err) {
        return res.send(err);
      }
      return res.send();
    });
  });
});
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
app.post('/editpost', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      return err;
    }
    var editedPost = {_id: new mongodb.ObjectID(req.body.postid)};
    var editedPostContent = req.body.post;
    db.collection('posts').update(editedPost, {$set: {content: editedPostContent}}, function (err, result) {
      if (err) {
        return res.send(err);
      }
      return res.send();
    });
  });
});
app.post('/newpost', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      return err;
    }
    var obj = req.body;
    var content = obj.post;
    var date = new Date();
    var newPost = {user_name: 'Damian',
      content: content,
      postdate: date
    };
    db.collection('posts').insertOne(newPost, function (err, result) {
      if (err) {
        return err;
      }
    });
    return res.send();
  });
});
app.get('/', function (req, res) {
	res.send('index.html');
});
app.listen(9876);
console.log('Server is running');
