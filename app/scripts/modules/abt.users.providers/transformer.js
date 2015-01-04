'use strict';

angular.module('abt.users.providers.transformer',[
	'ngTransformer'
])
.provider('UsersTransformerPrototype', UsersTransformerPrototypeProvider);

UsersTransformerPrototypeProvider.$inject = ['$transformProvider'];
function UsersTransformerPrototypeProvider ($transformProvider) {

	return Object.create($transformProvider);

}