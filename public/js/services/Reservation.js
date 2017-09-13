app.factory('Reservation', ['$http', 'Room', 'Client', function ($http, Room, Client) {
  function Reservation (reservationData) {
    if (reservationData) {
      this.setData(reservationData)
    }
  };

  Reservation.prototype = {
    clients: [],
    statusOptions: () => { return [{
      id: 0,
      name: 'NON CONFERMATO'
    }, {
      id: 1,
      name: 'CONFERMATO'
    }, {
      id: 2,
      name: 'PAGATO'
    }] },
    setData: function (reservationData) {
      angular.extend(this, reservationData)
    },
    all: function (cb) {
      var scope = this
      $http.get('/room/' + this.room_id + '/reservations').success(function (reservationData) {
        for (i in reservationData.reservations.data) {
          reservationData.reservations.data[i] = new Reservation(reservationData.reservations.data[i])
          reservationData.reservations.data[i].extend()
        }
        scope.setData(reservationData.reservations.data)
        if (cb) cb(reservationData.reservations.data)
      })
    },
    currents: function (cb) {
      var scope = this
      $http.get('/reservations/currents').success(function (reservationData) {
        for (i in reservationData.reservations.data) {
          reservationData.reservations.data[i] = new Reservation(reservationData.reservations.data[i])
          reservationData.reservations.data[i].extend()
        }
        scope.setData(reservationData.reservations.data)
        if (cb) cb(reservationData.reservations.data)
      })
    },
    startsToday: function (cb) {
      var scope = this
      $http.get('/reservations/starts/today').success(function (reservationData) {
        for (i in reservationData.reservations.data) {
          reservationData.reservations.data[i] = new Reservation(reservationData.reservations.data[i])
          reservationData.reservations.data[i].extend()
        }
        scope.setData(reservationData.reservations.data)
        if (cb) cb(reservationData.reservations.data)
      })
    },
    endsToday: function (cb) {
      var scope = this
      $http.get('/reservations/ends/today').success(function (reservationData) {
        for (i in reservationData.reservations.data) {
          reservationData.reservations.data[i] = new Reservation(reservationData.reservations.data[i])
          reservationData.reservations.data[i].extend()
        }
        scope.setData(reservationData.reservations.data)
        if (cb) cb(reservationData.reservations.data)
      })
    },
    load: function () {
      var scope = this
      $http.get('/reservation/' + this.id).success(function (reservationData) {
        reservationData.reservation.room ? reservationData.reservation.room = new Room(reservationData.reservation.room) : false
        scope.setData(reservationData.reservation)
        scope.extend()
      })
    },
    delete: function () {
      if (confirm('Sicuro di volere eliminare questa prenotazione?')) {
        $http.get('/room/' + this.room_id + '/reservation/' + this.id + '/delete').then(() => {
          location.href = '/#/'
        })
      }
    },
    create: function () {
      $http.post('/room/' + this.room_id + '/reservation/create', this)
    },
    update: function () {
      $http.post('/room/' + this.room_id + '/reservation/' + this.id + '/edit', this)
    },
    createClient: function (c) {
      var scope = this
      $http.post('/hotel/' + hotel().id + '/client/create', c).success(function (clientData) {
        $http.get('/reservation/' + scope.id + '/client/' + clientData.client.id + '/add').then(function () {
          scope.clients.push(new Client(clientData.client))
        })
      })
    },
    addClient: function (c) {
      var scope = this
      $http.get('/reservation/' + this.id + '/client/' + c.id + '/add').then(function () {
        scope.clients.push(c)
      })
    },
    removeClient: function (c) {
      var scope = this
      if (confirm('Rimuovere il cliente dalla prenotazione?'))
      { $http.get('/reservation/' + this.id + '/client/' + c.id + '/remove').then(function () {
        var i = scope.clients.findIndex((el) => {
          return el.id == c.id
        })
        scope.clients.splice(i, 1)
      }) }
    },
    duration: function () {
      if (this.until && this.since) {
        var now = moment(this.since)
        var then = moment(this.until)
        return (then.diff(now, 'days'))
      }
    },
    extend: function () {
      this.duration = this.duration()
      this.sinceF = moment(this.since).format('ddd') + ' ' + moment(this.since).format('DD/MM')
      this.untilF = moment(this.until).format('ddd') + ' ' + moment(this.until).format('DD/MM')
    }
  }
  return Reservation
}])
