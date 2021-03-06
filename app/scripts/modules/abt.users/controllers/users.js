'use strict';

UsersCtrl.$inject = ['$scope','$state','$q','UsersService'];
function UsersCtrl ($scope, $state, $q, UsersService) {
	$scope.users = [];
	$scope.selectUser = function (user) {
		$state.go('app.users.details', {
			userId: UsersService.getUserIdByObject(user)
		});
	};
	$scope.doRefresh = function () {
		$q.when(UsersService.getUsers()).then(function (resp) {
			console.info("UsersCtrl:: getUsers resp", resp);
			$scope.users = resp;
		}).finally(function() {
	       // Stop the ion-refresher from spinning
	       $scope.$broadcast('scroll.refreshComplete');
	     });
	};
	$scope.doRefresh();
}