angular.module('postownia').controller('IndexCtrl', ['$http', function ($http) {
  var vm = this;
  vm.user = 'Damian';
  vm.displayPosts = function () {
  $http.get('/posts').then(function (res) {
    vm.posts = res.data;
  });
}
  vm.addPost = function () {
    var data = {post: vm.content};
    $http.post('/newpost', data).then(function (res) {
      vm.content = '';
      vm.displayPosts();
    });
  }

  vm.deletePost = function (postID) {
    $http.delete('/deletepost/' + postID).then(function (res) {
      vm.content = '';
      vm.displayPosts();
    })
  }
  vm.displayPosts();
}]);
