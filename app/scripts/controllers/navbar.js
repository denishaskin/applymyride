'use strict';

var app = angular.module('applyMyRideApp');

angular.module('applyMyRideApp')
  .controller('NavbarController', ['$scope', '$location', 'flash', 'planService', 'deviceDetector', 'ipCookie', '$window',
    function ($scope, $location, flash, planService, deviceDetector, ipCookie, $window) {

      var input = document.createElement('input');
      input.setAttribute('type','date');
      var notADateValue = 'not-a-date';
      input.setAttribute('value', notADateValue);
      $scope.debugoff = !!APIHOST.match(/demo/);
      $scope.html5 = !(input.value === notADateValue);
      planService.html5 = $scope.html5;
      $scope.mobile = deviceDetector.isMobile();
      $scope.isUnsupportedBrowser = deviceDetector.browser.normalize() == "ie";
      planService.mobile = $scope.mobile;

      $scope.flash = flash;

      var that = this;
      that.$scope = $scope;

      $scope.reset = function() {
        planService.reset();
        $location.path("/plan/where");
      };

      $scope.showNavbar = function() {
        that.$scope.email = ipCookie('email');
        that.$scope.authentication_token = ipCookie('authentication_token');
        that.$scope.first_name = ipCookie('first_name');
        that.$scope.last_name = ipCookie('last_name');
        that.$scope.sharedRideId = ipCookie('sharedRideId');
        if(that.$scope.email){
          planService.email = $scope.email;
          planService.authentication_token = $scope.authentication_token;
        }else{
          that.$scope.email = planService.email;
          that.$scope.authentication_token = planService.authentication_token;
          that.$scope.first_name = planService.first_name;
          that.$scope.last_name = planService.last_name;
          that.$scope.last_name = planService.last_name;
          that.$scope.sharedRideId = planService.sharedRideId;
          that.$scope.walkingDistance = planService.walkingDistance;
          that.$scope.walkingSpeed = planService.walkingSpeed;
        }
        var currentBalancePathConditions = ['confirm_shared_ride', 'itinerary', 'plan', 'profile'];
        $scope.currentBalance = ipCookie('currentBalance');
        $scope.showCurrentBalance = that.$scope.email && currentBalancePathConditions.some(el => $location.path().includes(el)) 
          && ($scope.currentBalance != null);
        $scope.rideCount = ipCookie('rideCount');
        $scope.liveTrip = ipCookie('liveTrip');
        return true;
      };

      $scope.logout = function() {
        delete ipCookie.remove('email');
        delete ipCookie.remove('authentication_token');
        delete ipCookie.remove('currentBalance');
        sessionStorage.clear();
        localStorage.clear();
        delete $scope.email;
        delete planService.email;
        planService.killEtaChecker();
        $window.location.href = "#/";
        $window.location.reload();
        planService.to = '';
        planService.from = '';
      };

    }]);

angular.module('applyMyRideApp').factory('flash', function($rootScope) {
  var currentMessage = '';

  $rootScope.$on('$routeChangeSuccess', function() {
    currentMessage = null;
  });

  return {
    setMessage: function(message) {
      //queue.push(message);
      currentMessage = message;
    },
    getMessage: function() {
      return currentMessage;
    }
  };
});

app.directive('back', ['$window', function($window) {
  return {
    restrict: 'A',
    link: function (scope, elem) {
      elem.bind('click', function () {
        $window.history.back();
      });
    }
  };
}

]);
