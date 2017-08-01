var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/postowniadb';

MongoClient.connect(url, function (err, db) {
  if (err) {
    return err;
  }
  console.log('Database created!');
  db.createCollection('users', function (err, res) {
    if (err) {
      console.log(err);
      return err;
    }
    var exampleUser1 = {user_name: 'Damian', password: '123'};
    var exampleUser2 = {user_name: 'MarcinXD', password: '456'};
    db.collection('users').insertOne(exampleUser1, function (err, res) {
      if (err) {
        return err;
      }
      console.log('First example user inserted!');
    });
    db.collection('users').insertOne(exampleUser2, function (err, res) {
      if (err) {
        return err;
      }
      console.log('Second example user inserted!');
    });
  });
  db.createCollection('posts', function (err, res) {
    if (err) {
      return err;
    }
    var examplePost1 = {user_name: 'Damian', content: 'oddawaj posta xdffff', postdate: '2017-04-22T08:53:34.317Z', postid: 1490210417910};
    var examplePost2 = {user_name: 'Damian', content: 'Niech bedzie xddddddddddd', postdate: '2017-07-01T19:21:29.104Z', postid: 1498936889104};
    db.collection('posts').insertOne(examplePost1, function (err, res) {
      if (err) {
        return err;
      }
      console.log('First example post inserted!');
    });
    db.collection('posts').insertOne(examplePost2, function (err, res) {
      if (err) {
        return err;
      }
      console.log('Second example post inserted!');
    });
  });
  db.collection('users').findOne({}, function (err, result) {
    if (err) {
      return err;
    }
    console.log(result);
  });
  //db.close();
});
