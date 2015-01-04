'use strict';

UserDetailsCtrl.$inject = ['$scope','$stateParams'];
function UserDetailsCtrl ($scope, $stateParams) {
	$scope.user = {
		firstName: 'Alexey',
		lastName: 'Bondarenko',
		birthDate: new Date('1995-02-21T00:00:00'),
		jobTitle: 'Senior Javascript Dev'
	};	
}