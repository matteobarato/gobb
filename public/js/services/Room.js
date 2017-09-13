app.factory('Room', ['$http', function ($http) {
  function Room (roomData) {
    if (roomData) {
      this.setData(roomData)
    }
  };
  Room.prototype = {
    typesOptions: () => { return [{
      id: 0,
      name: 'CAMERA SINGOLA'
    }, {
      id: 1,
      name: 'CAMERA DOPPIA'
    }, {
      id: 2,
      name: 'CAMERA FAMIGLIARE'
    }, {
      id: 3,
      name: 'APPARTAMENTO'
    }, {
      id: 4,
      name: 'ALTRO'
    }] },
    setData: function (roomData) {
      angular.extend(this, roomData)
    },
    all: function (cb) {
      var scope = this
      $http.get('/hotel/' + h().id + '/rooms').success(function (roomData) {
        for (i in roomData.rooms) {
          roomData.rooms[i] = new Room(roomData.rooms[i])
        }
        for (i in scope) {
          if (scope.hasOwnProperty(i)) {
            delete scope[i]
          }
        }
        scope.setData(roomData.rooms)
        if (cb) cb(roomData.rooms)
      })
    },
    search: function (cb) {
      var scope = this
      $http.get('/hotel/' + h().id + '/rooms/search?name=' + this.name).success(function (roomData) {
        for (i in roomData.rooms.data) {
          roomData.rooms.data[i] = new Room(roomData.rooms.data[i])
        }
        for (i in scope) {
          if (scope.hasOwnProperty(i)) {
            delete scope[i]
          }
        }
        scope.setData(roomData.rooms.data)
        if (cb) cb(roomData.rooms.data)
      })
    },
    load: function () {
      var scope = this

      $http.get('/room/' + this.id).success(function (roomData) {
        scope.setData(roomData.room)
        console.log(roomData.room)
      })
    },
    delete: function (id) {
      if (confirm('Sicuro di volere eliminare questa camera?')) {
        if (!id) $http.get('/hotel/' + h().id + '/room/' + this.id + '/delete')
        else {
          $http.get('/hotel/' + h().id + '/room/' + id + '/delete').then(() => {
            this.all()
          })
        }
      }
    },
    create: function () {
      $http.post('/hotel/' + h().id + '/room/create', this)
    },
    update: function () {
      $http.post('/hotel/' + h().id + '/room/' + this.id + '/edit', this)
    },
    getType: function () {
      if (this.type == undefined) return ''
      var to = this.typesOptions()
      for (i in to) {
        if (this.type == to[i].id) return to[i].name
      }
    },
    isAvailable: function () {
      return true
    }
  }
  return Room
}])
