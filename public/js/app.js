var Settings = {
  lang: 'it-IT'
}
var u = (user) => {
    // if (user) this.user = user
    // return this.user
  return {
    id: 1
  }
}
var h = (hotel) => {
    // if (user) this.user = user
    // return this.user
  return {
    id: 1
  }
}
var hotel = h

var app = angular.module('goBB', ['ngRoute', 'ngAnimate', 'ngFileUpload', 'daterangepicker'])

app.directive('number', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function (value) {
        return '' + value
      })
      ngModel.$formatters.push(function (value) {
        return parseFloat(value)
      })
    }
  }
})

app.run(($http, $rootScope, $location) => {
  moment.locale('it')

  angular.element(document).ready(function () {
    $rootScope.user = {}

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
                // User is signed in.
        $rootScope.user = user
        u(user)
        user.getIdToken().then(function (accessToken) {
                    // document.getElementById('sign-in-status').textContent = 'Signed in'
                    // document.getElementById('sign-in').textContent = 'Sign out'
                    /* document.getElementById('account-details').textContent = JSON.stringify({
                      displayName: displayName,
                      email: email,
                      emailVerified: emailVerified,
                      photoURL: photoURL,
                      uid: uid,
                      accessToken: accessToken,
                      providerData: providerData
                    }, null, '  ') */
        })
      }
    }, function (error) {
      console.log(error)
    })
  })
})
app.factory('HttpInterceptorMessage', ['$q', '$location', '$rootScope', function ($q, $location, $rootScope) {
  return {
        // optional method
    'request': function (config) {
      if (config.url[0] === '/') {
        config.url = ('http://localhost:82' + config.url)
      }
      $('#http-response-loading').css({display: 'block'})
      return config
    },
    'response': function (response) {
            // do something on success
      if (response.data.message) {
        /* $.notify({
          message: response.data.message
        }, {
          type: 'success'
        }) */
      };
      $('#http-response-loading').css({display: 'none'})
      $('#http-response-success').css({display: 'block'})
      setTimeout(function () {
        $('#http-response-success').css({display: 'none'})
      }, 1000)

      return response
    },

    'responseError': function (response) {
            // do something on error

      if (response.data && response.data.message) {
        $.notify({
          message: response.data.message
        }, {
          type: 'danger'
        })
      }

      $('#http-response-loading').css({display: 'none'})
      /* $('#http-response-error').css({display: 'block'})
      setTimeout(function () {
        $('#http-response-error').css({display: 'none'})
      }, 2000) */

      return $q.reject(response)
    }
  }
}])

app.config(['$locationProvider', '$routeProvider', '$httpProvider',
    function ($locationProvider, $routeProvider, $httpProvider, $weeklyScheduler, $weeklySchedulerI18N) {
      $routeProvider
            .when('/', {
              templateUrl: 'js/home/home.template.html'
            })
            .when('/start', {
              templateUrl: 'js/login/wizard_hotel.template.html'
            })
            .when('/home', {
              templateUrl: 'js/home/home.template.html'
            })
            .when('/calendar', {
              templateUrl: 'js/calendar/calendar.template.html'
            })
            .when('/clients', {
              templateUrl: 'js/clients/clients.template.html'
            })
            .when('/client', {
              templateUrl: 'js/clients/client.template.html'
            })
            .when('/client/:id', {
              templateUrl: 'js/clients/client.template.html'
            })
            .when('/rooms', {
              templateUrl: 'js/rooms/rooms.template.html'
            })
            .when('/room', {
              templateUrl: 'js/rooms/room.template.html'
            })
            .when('/room/:id', {
              templateUrl: 'js/rooms/room.template.html'
            })
            .when('/reservation/create', {
              templateUrl: 'js/reservations/new_reservation.template.html'
            })
            .when('/reservation/:id', {
              templateUrl: 'js/reservations/reservation.template.html'
            })
            .when('/profile', {
              templateUrl: 'js/profile/profile.template.html'
            })
            .when('/login', {
              templateUrl: 'js/login/login.template.html'
            })

        // $locationProvider.html5Mode(true)
      $httpProvider.interceptors.push('HttpInterceptorMessage')
    }
])

app.filter('moment', function () {
  return function (input, momentFn /*, param1, param2, ...param n */) {
    var args = Array.prototype.slice.call(arguments, 2),
      momentObj = moment(input)
    return momentObj[momentFn].apply(momentObj, args)
  }
})
