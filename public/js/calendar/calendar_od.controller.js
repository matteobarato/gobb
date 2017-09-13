app.controller('calendarController', ['$rootScope', '$scope', '$routeParams', '$route', '$timeout', '$http', '$location', '$window', 'weeklyScheduler', 'Reservation', ($rootScope, $scope, $routeParams, $route, $timeout, $http, $location, $window, $weeklyScheduler, Reservation) => {
  $window.scrollTo(0, 0)
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
          slotDuration: {days: 1}
        }
      }, // Only show week view
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      displayEventTime: true, // Display event time
      header: {
        left: 'prev',
        center: 'title',
        right: 'today,next'
      },

      resources: [{
        title: 'Room1',
        id: 1

      }, {
        title: 'Room3',
        id: 2
      }, {
        title: 'Romm2',
        id: 3
      }],
      events: [{
        resourceId: 1,
        title: 'This is a Material Design event!',
        start: '2017-07-012 10:30:00',
        end: '2017-07-016 10:30:00',
        color: '#C2185B',
        url: '#reservation/1'
      }, {
        resourceId: 2,
        title: 'This is a Material Design event!',
        start: '2017-07-016 10:30:00',
        end: '2017-07-18 10:30:00',
        color: '#2196F3'
      }, {
        resourceId: 3,
        title: 'This is a Material Design event!',
        start: '2017-07-15 10:30:00',
        end: '2017-07-25 19:30:00',
        color: '#FFEB3B'
      }]
    })
  }, 0)
}])
