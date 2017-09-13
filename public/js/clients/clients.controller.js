app.controller('clientsController', ['$rootScope', '$scope', '$routeParams', '$route', '$timeout', '$http', '$location', '$window', 'Client', ($rootScope, $scope, $routeParams, $route, $timeout, $http, $location, $window, Client) => {
  $window.scrollTo(0, 0)
  $timeout(() => {
    initDash()
  }, 0)

  $scope.clients, $scope.client = {}

  if ($routeParams.id) {
    $scope.client = new Client({
      id: $routeParams.id
    })
    $scope.client.load()
  } else {
    $scope.clients = new Client()
    $scope.clients.all()
  }

  $scope.submit = function () {
    if ($scope.client.id) $scope.client.update()
    else { $scope.client = new Client($scope.client); $scope.client.create() }
    $timeout(() => {
      $location.path('/clients')
    }, 500)
    /* if ($scope.form.file.$valid && $scope.file) {
      $scope.upload($scope.file)
    } */
  }

  $scope.delete = function () {
    if ($scope.client.id) $scope.client.delete()
    $timeout(() => {
      $location.path('/clients')
    }, 500)
  }

    // upload on file select or drop
  /* $scope.upload = function (file) {
    Upload.upload({
      url: 'upload/url',
      data: {
        file: file,
        'username': $scope.username
      }
    }).then(function (resp) {
      console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data)
    }, function (resp) {
      console.log('Error status: ' + resp.status)
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total)
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name)
    })
  }
        // for multiple files:
  $scope.uploadFiles = function (files) {
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {}
            // or send them all together for HTML5 browsers:
    }
  } */
}])
