app.controller('roomsController', ['$rootScope', '$scope', '$routeParams', '$timeout', '$http', '$window', '$location', 'Room', ($rootScope, $scope, $routeParams, $timeout, $http, $window, $location, Room) => {
  $window.scrollTo(0, 0)
  $timeout(() => {
    initDash()
  }, 200)

  $scope.typesOptions = new Room().typesOptions()

  $scope.room, $scope.rooms = {}

  if ($routeParams.id) {
    $scope.room = new Room({id: $routeParams.id})
    $scope.room.load()
  } else {
    $scope.rooms = new Room()
    $scope.rooms.all()
  }

  $scope.submit = () => {
    if ($scope.room.id) $scope.room.update()
    else { $scope.room = new Room($scope.room); $scope.room.create() }
    $timeout(() => {
      $location.path('/rooms')
    }, 500)
  }
}])
