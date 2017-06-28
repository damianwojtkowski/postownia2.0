angular.module('postownia').controller('IndexCtrl', ['$http', function ($http) {
  var vm = this;
  vm.displayPosts = function () {
  $http.get('/posts').then(function (res) {
    vm.posts = res.data;
  });
}
  vm.addPost = function () {
    var data = {post: vm.content};
    console.log(data);
    $http.post('/newpost', data).then(function (res) {
      vm.content = '';
      vm.displayPosts();
    });
  }
  vm.displayPosts();
}]);
