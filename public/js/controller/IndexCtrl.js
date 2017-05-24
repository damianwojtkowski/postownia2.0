angular.module('postownia').controller('IndexCtrl', ['$http', function ($http) {
  var vm = this;
  $http.get('/posts').then(function (res) {
    vm.posts = res.data;
  });
}]);
