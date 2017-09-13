app.controller('chartController', ['$rootScope', '$scope', '$routeParams', '$route', '$timeout', '$http', '$location',
	($rootScope, $scope, $routeParams, $route, $timeout, $http, $location) => {
  var points = []
  var names = []

  $scope.options = {
    responsive: true,
    maintainAspectRatio: false
  }
  console.log($scope.options)

  for (var i in Engine.tags) {
    points.push(Engine.tags[i].points)
    names.push(Engine.tags[i].name)
  }
  $scope.series = ['Name', 'Points']
  $scope.labels = names
  $scope.data = [
    names,
    points
  ]

  $scope.engine = () => {
	 return	Engine
  }
}])
