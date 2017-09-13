app.factory(' User', ['$http', function ($http) {
  function User (userData) {
    if (userData) {
      this.setData(userData)
    }
  };

  User.prototype = {
    setData: function (userData) {
      angular.extend(this, userData)
    },
    load: function (obj) {
      var scope = this
      $http.get('/user/' + obj.id).success(function (userData) {
        scope.setData(userData.reservation)
      })
    },
    login: function (obj) {
      var scope = this
      firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function (idToken) {
        $http.post('user/login', {idToken: idToken}).success((userData) => {
          console.log(userData)
        })
      }).catch(function (error) {
                // Handle error
      })
    }
  }
  return User
}])
