angular.module('flapperNews', ['ui.router'])

//.......controller starts.........

.controller('MainCtrl', ['$scope','posts', function ($scope, posts) {
  $scope.posts = posts.posts;

  $scope.addPost = function(){ 
    if (!$scope.title || $scope.title === '') {
      return;}; 
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: [
        {author: 'Joe', body: 'Cool post!', upvotes: 0},
        {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
      ]
    });
      $scope.title = "";
      $scope.link = "";
  }

  $scope.incrementUpvotes = function(post){
    post.upvotes += 1;
  }
}])

.controller('PostsCtrl', ['$scope','$stateParams','posts', function ($scope,$stateParams,posts) {
    $scope.posts = posts.posts[$stateParams.id];
}])

//...........factory starts............

.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}])
//........config starts...........

.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
  $stateProvider
  .state('home',{
    url: '/home',
    templateUrl: '/home.html',
    controller: 'MainCtrl'
  })
  .state('posts',{
    url: '/posts/{id}',
    templateUrl: '/posts.html',
    controller: 'PostsCtrl'
  })
  $urlRouterProvider.otherwise('home');
}])