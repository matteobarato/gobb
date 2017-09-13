app.factory('Client', ['$http', function ($http) {
  function Client (clientData) {
    if (clientData) {
      this.setData(clientData)
    }
  };

  Client.prototype = {
    setData: function (clientData) {
      angular.extend(this, clientData)
    },
    all: function () {
      var scope = this
      $http.get('/hotel/' + h().id + '/clients').success(function (clientData) {
        for (i in clientData.clients) {
          clientData.clients[i] = new Client(clientData.clients[i])
        }
        for (i in scope) {
          if (scope.hasOwnProperty(i)) {
            delete scope[i]
          }
        }
        scope.setData(clientData.clients)
      })
    },
    search: function () {
      var scope = this
      $http.get('/hotel/' + h().id + '/clients/search?name=' + this.name + '&surname=' + this.surname).success(function (clientData) {
        for (i in clientData.clients.data) {
          clientData.clients.data[i] = new Client(clientData.clients.data[i])
        }
        for (i in scope) {
          if (scope.hasOwnProperty(i)) {
            delete scope[i]
          }
        }
        scope.setData(clientData.clients.data)
      })
    },
    load: function () {
      var scope = this
      $http.get('/client/' + this.id).success(function (clientData) {
        scope.setData(clientData.client)
      })
    },
    add: function () {
      $http.post('/reservation/' + this.reservation_id + '/client/' + this.id ? this.id : '' + '/add', this)
    },
    remove: function () {
      $http.get('/reservation/' + this.reservation_id + '/client/' + this.id + '/remove')
    },
    delete: function (id) {
      if (confirm('Sicuro di volere eliminare il Cliente ' + this.name + ' ' + this.surname + ' ?')) {
        if (!id) $http.get('/hotel/' + h().id + '/client/' + this.id + '/delete')

        else {
          $http.get('/hotel/' + h().id + '/client/' + this.id + '/delete').then(() => {
            this.all()
          })
        }
      }
    },
    create: function () {
      $http.post('/hotel/' + h().id + '/client/create', this)
    },
    update: function () {
      $http.post('/hotel/' + h().id + '/client/' + this.id + '/edit', this)
    }
  }
  return Client
}])
