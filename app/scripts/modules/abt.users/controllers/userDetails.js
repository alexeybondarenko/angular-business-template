'use strict';

UserDetailsCtrl.$inject = ['$scope','$stateParams','UsersService'];
function UserDetailsCtrl ($scope, $stateParams, UsersService) {
	$scope.user = UsersService.getUserById($stateParams.userId);
}