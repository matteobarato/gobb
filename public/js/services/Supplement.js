app.factory('Supplement', ['$http', function ($http) {
  function Supplement (supplementData) {
    if (supplementData) {
      this.setData(supplementData)
    }
  };

  Supplement.prototype = {
    setData: function (supplementData) {
      angular.extend(this, supplementData)
    },
    all: function () {
      var scope = this
      $http.get('/reservation/' + this.reservation_id + '/supplements').success(function (supplementData) {
        for (i in supplementData.supplements) {
          supplementData.supplements[i] = new Supplement(supplementData.supplements[i])
        }
        scope.setData(supplementData.supplements)
      })
    },
    load: function () {
      var scope = this
      $http.get('/reservation/' + this.reservation_id + '/supplement/' + this.id).success(function (supplementData) {
        scope.setData(supplementData.supplement)
      })
    },
    delete: function () {
      $http.get('/reservation/' + this.reservation_id + '/supplement/' + this.id + '/delete')
    },
    create: function () {
      $http.post('/reservation/' + this.reservation_id + '/supplement/create', this)
    },
    update: function () {
      $http.post('/reservation/' + this.reservation_id + '/supplement/' + this.id + '/edit', this)
    }
  }
  return Supplement
}])
