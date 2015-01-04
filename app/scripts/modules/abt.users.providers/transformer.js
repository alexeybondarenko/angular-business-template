'use strict';

angular.module('abt.users.providers.transformer',[
	'ngTransformer'
])
.provider('UsersApiTransformer',UsersApiTransformer);

UsersApiTransformer.$inject = ['$transformProvider'];
function UsersApiTransformer ($transformProvider) {
	return $transformProvider;
}