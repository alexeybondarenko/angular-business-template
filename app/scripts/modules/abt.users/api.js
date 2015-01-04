'use strict';

angular.module('abt.users.api',[
	'abt.users.providers.api'
])
.service('UsersApi', UsersApi);

UsersApi.$inject = ['$http','UsersApiPrototype'];
function UsersApi ($http, UsersApiPrototype) {

	function UsersApiObj () {}
	UsersApiObj.prototype = new UsersApiPrototype ();

	UsersApiObj.prototype.getUsers = function () {
		return $http.get('data/users.json').then(function(resp) {
			return resp.data.users;
		});
	};

	return new UsersApiObj ();
}
