'use strict';

angular.module('abt.users.api.http',[
	'abt.users.providers.api',
	'abt.users.providers.transformer',
])
.provider('UsersApi', UsersApiProvider)
.provider('UsersApiTransformer',UsersApiTransformer);

/**************************
* Local Api Configuration *
***************************/

UsersApiTransformer.$inject = ['UsersTransformerPrototypeProvider'];
function UsersApiTransformer (UsersTransformerPrototypeProvider) {
	
	var localApiTransformer = Object.create(UsersTransformerPrototypeProvider);
	var localApiMap = {
		firstName: 'first_name',
		lastName: 'last_name',
		birthDate: 'birth_date',
		jobTitle: 'job_title'
	};
	localApiTransformer.setMap(localApiMap);
	return localApiTransformer;
}

function UsersApiProvider () {
	return {
		url: '',
		$get: UsersApi
	}
}
UsersApi.$inject = ['$http','UsersApiPrototype'];
function UsersApi ($http, UsersApiPrototype) {

	function UsersApiObj (url) {
		this.url = url;
	}
	UsersApiObj.prototype = new UsersApiPrototype ();
	UsersApiObj.prototype.url = '';
	UsersApiObj.prototype.getUsers = function () {
		return $http.get(this.url).then(function(resp) {
			return resp.data.users;
		});
	};

	return new UsersApiObj (this.url);
}