app.factory(' Hotel', ['$http', function ($http) {
  function Hotel (hotelData) {
    if (hotelData) {
      this.setData(hotelData)
    }
  };

  Hotel.prototype = {
    setData: function (hotelData) {
      angular.extend(this, hotelData)
    },
    all: function () {
      var scope = this
      $http.get('/user/' + u().id + '/hotels').success(function (hotelData) {
        for (i in hotelData.hotels) {
          hotelData.hotels[i] = new Hotel(hotelData.hotels[i])
        }
        scope.setData(hotelData.hotels)
      })
    },
    load: function (obj) {
      var scope = this
      $http.get('/user/' + u().id + '/hotel/' + obj.id).success(function (hotelData) {
        scope.setData(hotelData.hotel)
      })
    },
    delete: function (obj) {
      $http.get('/user/' + u().id + '/hotel/' + this.id + '/delete')
    },
    create: function (obj) {
      $http.post('/user/' + u().id + '/hotel/create', this)
    },
    update: function (obj) {
      $http.post('/user/' + u().id + '/hotel/' + this.id + '/edit', this)
    }
  }
  return Hotel
}])
