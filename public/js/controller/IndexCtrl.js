angular.module('postownia').controller('IndexCtrl', ['$http', function ($http) {
  var vm = this;
  $http.get('/posts').then(function (res) {
    var data = res;
    console.log(data);
  });
}]);
