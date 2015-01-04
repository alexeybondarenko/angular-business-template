'use strict';

angular.module('abt.users.providers.cache',[])
.provider('UsersCache', UsersCacheProvider);

function UsersCacheProvider () {
	return {
		name: 'users',
		$get: UsersCache
	}
}

UsersCache.$inject = [];
function UsersCache () {

	function UsersCacheObj () {}
	var _data = null;

	UsersCacheObj.prototype.save  = function (data) {
		console.info("UsersCache:: saving data");
		_data = data;
	};
	UsersCacheObj.prototype.load = function () {
		console.info("UsersCache:: loading data");
		return _data;
	};
	
	return new UsersCacheObj();
}