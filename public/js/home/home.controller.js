app.controller('homeController', ['$rootScope', '$scope', '$routeParams', '$route', '$timeout', '$http', '$location', '$window', 'Reservation', ($rootScope, $scope, $routeParams, $route, $timeout, $http, $location, $window, Reservation) => {
  $window.scrollTo(0, 0)
  $timeout(() => {
    initDash()
  }, 0)

  $scope.arrivals = new Reservation()
  $scope.departures = new Reservation()
  $scope.actual = new Reservation()

  $scope.arrivals.startsToday()
  $scope.departures.endsToday()
  $scope.actual.currents()

  console.log($scope.arrivals)
}])
