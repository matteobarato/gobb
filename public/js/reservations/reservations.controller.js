app.controller('reservationsController', ['$rootScope', '$scope', '$routeParams', '$route', '$timeout', '$http', '$location', '$window', 'Reservation', 'Room', 'Client', 'Supplement', ($rootScope, $scope, $routeParams, $route, $timeout, $http, $location, $window, Reservation, Room, Client, Supplement) => {
  $scope.statusOptions = new Reservation().statusOptions()

  $window.scrollTo(0, 0)
  $scope.reservation = new Reservation(), $scope.reservations = new Reservation()
  $scope.search_key_rooms = new Room({
    name: ''
  })
  $scope.res_rooms = new Room()
  $scope.room = new Room()
  $scope.search_key_clients = new Client({
    name: '',
    surname: '',
    id_code: ''
  })
  $scope.res_clients = new Client()
  $scope.clients = new Client()
  $scope.new_client = {}
  $scope.new_supplement = {}

  $scope.datePicker = {date: {startDate: null, endDate: null}}
  $scope.datePicker.options = {
    parentEl: '#datepicker-container',
    opens: 'center', alwaysShowCalendars: true,
    locale: {
      applyLabel: 'Applica',
      fromLabel: 'Dal',
      format: 'D-MMMM', // will give you 2017-01-06
	// format: "D-MMM-YY", //will give you 6-Jan-17
	// format: "D-MMMM-YY", //will give you 6-January-17
      toLabel: 'al',
      cancelLabel: 'Cancella'
    }
  }
  {
    $timeout(() => {
      if (!$routeParams.id) {
        initWizard()
      }
      initDash()
      $('#wizardForm').addClass('animated')
      $('#wizardForm').removeClass('hide')
    }, 0)
  }

  if ($routeParams.id) {
    $scope.reservation = new Reservation({
      id: $routeParams.id
    })
    $scope.reservation.load()
  }

  $scope.submit = () => {
    if ($scope.reservation.id && $scope.reservation.room_id) {
      $scope.reservation.update()
    } else if ($scope.reservation.room_id) {
      $scope.reservation.since = $scope.datePicker.date.startDate
      $scope.reservation.until = $scope.datePicker.date.endDate
      console.log($scope.reservation)
      $scope.reservation = new Reservation($scope.reservation)
      $scope.reservation.create()
    }
  }

  $scope.searchRooms = () => {
    $scope.res_rooms = new Room($scope.search_key_rooms)
    console.log($scope.res_rooms)
    $scope.res_rooms.search()
  }
  $scope.selectRoom = (room) => {
    if (room.id) {
      $scope.reservation.room_id = room.id
    }
    console.log(room.id)
  }
  $scope.searchClients = () => {
    $scope.res_clients = new Client($scope.search_key_clients)
    $scope.res_clients.search()
  }
  $scope.addClients = (client) => {
    if (client.id) {
      $scope.reservation.clients.push(client)
    }
  }
  $scope.searchRooms()

  $scope.addSupplement = () => {
    var sup = new Supplement($scope.new_supplement)
    sup.reservation_id = $scope.reservation.id
    sup.create()
    if (!$scope.reservation.supplements || $scope.reservation.supplements.length == 0) $scope.reservation.supplements = []
    $scope.reservation.supplements.push(sup)
    $scope.new_supplement = {}
  }
  $scope.removeSupplement = (sup) => {
    var ind = $scope.reservation.supplements.findIndex((el) => {
      return el.id == sup.id
    })
    if (ind > -1) {
      $scope.reservation.supplements.splice(ind, 1)
    }
    s = new Supplement(sup)
    s.delete()
  }
  $scope.supplementsAmount = () => {
    var tot = 0
    for (i in $scope.reservation.supplements) {
      tot += parseFloat($scope.reservation.supplements[i].price)
    }
    return tot
  }
}])
