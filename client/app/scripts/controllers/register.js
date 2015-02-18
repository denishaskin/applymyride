'use strict';

angular.module('applyMyRideApp')
  .controller('RegisterController', ['$scope', '$location', 'flash',
    function ($scope, $location, flash) {
      $scope.detectLoginType = function() {
        $scope.isEmail = /@/.test($scope.login.emailOrId);
        $scope.isSharedRideId = !$scope.isEmail && /^\d+$/.test($scope.login.emailOrId);
      };

      $scope.submittable = function() {
        var f = $scope.loginForm;
      };

      $scope.register = function() {
        flash.setMessage('Welcome, Eric!');
        $location.path('/plan/start');
      };
    }
  ]);
