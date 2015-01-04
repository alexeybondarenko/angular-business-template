'use strict';

var module = angular.module('abt.users', [
	'abt.users.providers',
	'abt.users.api'
])
.controller('UsersCtrl', UsersCtrl)
.controller('UserDetailsCtrl', UserDetailsCtrl)
.config(AbtUsersConfig)
.run(AbtUsersRun);

AbtUsersConfig.$inject = ['$provide','UsersApiTransformerProvider','UsersFirebaseApiProvider','UsersApiProvider'];
function AbtUsersConfig ($provide, UsersApiTransformerProvider, UsersFirebaseApiProvider, UsersApiProvider) {
	// configure base API parameters
	UsersFirebaseApiProvider.url = 'https://blistering-fire-8159.firebaseio.com/users'; // firebase url
	UsersApiProvider.url = 'data/users.json'; // local file url

	// Example of extending 3rd party dependencie by decorator
	$provide.decorator('UsersCache', function ($delegate) {
		for (var prop in $delegate.__proto__) {
			if ($delegate.__proto__.hasOwnProperty(prop) && typeof $delegate.__proto__[prop] === 'function') {
				$delegate[prop] = (function (funcName) {
					return function() {
						console.info("[decorator example] ",this, funcName, "launch");
						return this.__proto__[funcName].apply(this, arguments);
					};
				})(prop);
			}
		}
		return $delegate;
	});
	// Another example of changin behaviour of UsersService provider
	$provide.decorator('UsersService', function ($delegate) {
		console.log($delegate);
		// $delegate.getUsers = function () {
		// 	return [
		// 		{
		// 			firstName: 'Oleksii',
		// 			lastName: 'Bondarenko',
		// 			birthDate: new Date(),
		// 			jobTitle: 'CEO'
		// 		}
		// 	];
		// };
		return $delegate;
	});
}

AbtUsersRun.$inject = ['UsersService','UsersApi','UsersApiTransformer','UsersFirebaseApi','UsersFirebaseApiTransformer'];
function AbtUsersRun (UsersService,UsersApi,UsersApiTransformer, UsersFirebaseApi, UsersFirebaseApiTransformer) {
	// configuration service for using firebase api and transformer
	UsersService.api = UsersApi;
	UsersService.transformer = UsersApiTransformer;
}

