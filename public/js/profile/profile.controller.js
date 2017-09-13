app.controller('profileController', ['$rootScope', '$scope', '$routeParams', '$route', '$timeout', '$http', '$location', '$window', ($rootScope, $scope, $routeParams, $route, $timeout, $http, $location, $window) => {
  $window.scrollTo(0, 0)
  $timeout(() => {
    initDash()
  }, 0)
}])
