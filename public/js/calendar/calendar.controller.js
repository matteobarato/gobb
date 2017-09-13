app.controller('calendarController', ['$rootScope', '$scope', '$routeParams', '$route', '$timeout', '$http', '$location', '$window', 'Reservation', 'Room',
    ($rootScope, $scope, $routeParams, $route, $timeout, $http, $location, $window, Reservation, Room) => {
      $window.scrollTo(0, 0)
      $scope.rooms = new Room()

      $timeout(() => {
        $('#calendar').fullCalendar({
                // editable: false, // Don't allow editing of events
          lang: 'it',
          handleWindowResize: true,
                // weekends: false, // Hide weekends
          defaultView: 'timelineBook',
          views: {
            timelineBook: {
              type: 'timeline',
              duration: {
                weeks: 1
              },
              slotDuration: {
                days: 1
              }
            }
          }, // Only show week view
          schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
          displayEventTime: true, // Display event time
          header: {
            left: 'prev',
            center: 'title',
            right: 'today,next'
          },

          resources: [],
          events: function (start, end, timezone, callback) {
            console.log($scope.rooms)
            var events = []
            var ids = []
            for (var i in $scope.rooms) {
              if ($scope.rooms.hasOwnProperty(i)) {
                ids.push($scope.rooms[i].id)
              }
            }

            $http.get('/rooms/' + ids.toString() + '/reservations').success(function (reservationData) {
              for (i in reservationData.reservations.data) {
                events.push({
                  resourceId: reservationData.reservations.data[i].room_id,
                  id: reservationData.reservations.data[i].id,
                  reservation: reservationData.reservations.data[i],
                  title: ' ',
                  start: reservationData.reservations.data[i].since,
                  end: reservationData.reservations.data[i].until,
                  url: '#/reservation/' + reservationData.reservations.data[i].id
                })
              }
              callback(events)
            })
          },

          eventAfterRender: function (event, element, view) {
            console.log(element)
            var people = document.createElement('span')
            people.classList.add('fc-people', 'col-sm-1')
            people.innerHTML = event.reservation.people_expected ? event.reservation.people_expected + ' pp.' : ''
            var info = document.createElement('span')
            info.classList.add('fc-info', 'col-sm-10', 'col-md-4')
            info.innerHTML = '<h6 class="text-info">' + event.reservation.info_name + '</h6> <a>tel: ' + event.reservation.info_telephone + '</a>'
            var notes = document.createElement('span')
            notes.classList.add('fc-notes', 'col-sm-0', 'col-md-4', 'text-default')
            notes.innerHTML = '<a class="text-info">Note: </a> <br><p>' + event.reservation.notes.substring(0, 100) + '...</p>'

            element.find('.fc-content').append(people)
            element.find('.fc-content').append(info)
            if (element.width() > 380) element.find('.fc-content').append(notes)
            element.css({height: '80px', borderRadius: '3px', boxShadow: '0 2px 5px 0 rgba(0,0,0,.16), 0 2px 5px 0 rgba(0,0,0,.23)', color: '#222'})
          }

        })
        $scope.rooms.all((res) => {
          for (var i in res) {
            if (res.hasOwnProperty(i)) {
              $('#calendar').fullCalendar('addResource', {
                id: res[i].id,
                title: res[i].name,
                eventColor: '#FAFAFA'
              })
            }
          }
          $('#calendar').fullCalendar('refetchEvents')
        })
      }, 0)
    }
])

var select_color = (type) => {
  if (type == 0) {
    return '#9c27b0'
  }
  else if (type == 1) {
    return '#4caf50'
  }
  return '#ff9800'
}
