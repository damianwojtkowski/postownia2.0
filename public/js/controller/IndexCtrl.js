angular.module('postownia').controller('IndexCtrl', ['$http', function ($http) {
  var vm = this;
  vm.user = 'Damian';

  vm.displayPosts = function () {
  $http.get('/posts').then(function (res) {
    vm.posts = res.data;
    vm.posts.forEach(function (obj) {
      obj.isShowed = true;
    });
  });
}
  vm.addPost = function () {
    var data = {post: vm.content};
    $http.post('/newpost', data).then(function (res) {
      vm.content = '';
      vm.displayPosts();
    });
  }
  vm.changeContent = function (postID) {
    var data = {postid: postID,
      post: vm.newContent};
    $http.post('/editpost', data).then(function (res) {
      vm.displayPosts();
    });
  }
  vm.deletePost = function (postID) {
    $http.delete('/deletepost/' + postID).then(function (res) {
      vm.content = '';
      vm.displayPosts();
    });
  }
  vm.showEditArea = function (postID) {
    vm.posts.forEach(function (obj) {
      if (postID === obj._id) {
        obj.isShowed = !obj.isShowed;
        vm.newContent = obj.content;
      }
    });
  }
  vm.displayPosts();
}]);
