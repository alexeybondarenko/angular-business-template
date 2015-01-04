'use strict';

var module = angular.module('abt.users', [
	'abt.user.providers',
	'abt.users.api',
	'firebase'
])
.controller('UsersCtrl', UsersCtrl)
.controller('UserDetailsCtrl', UserDetailsCtrl)
.config(AbtUsersConfig)
.run(AbtUsersRun);


module.service('UsersFirebaseApi', UsersFirebaseApi);
UsersFirebaseApi.$inject = ['$rootScope','$firebase','UsersApiPrototype','$q'];
function UsersFirebaseApi ($rootScope, $firebase, UsersApiPrototype,$q) {
	
	var url = 'https://blistering-fire-8159.firebaseio.com/users';
	var ref = new Firebase (url);
	// create an AngularFire reference to the data
    var sync = $firebase(ref);
    console.log("sync", sync);
    // download the data into a local object
    var loaded = false;
    var data = sync.$asArray();

    this.getUsers = function () {
    	// if (loaded) {
    	// 	return data;
    	// }
    	return data.$loaded();
    	console.log("UsersFirebaseApi: getUsers");
		
	};
}
AbtUsersConfig.$inject = ['UsersApiTransformerProvider'];
function AbtUsersConfig (UsersApiTransformerProvider) {
	UsersApiTransformerProvider.setMap({
		firstName: 'first_name',
		lastName: 'last_name',
		birthDate: 'birth_day',
		jobTitle: 'job_title'
	});	
}

AbtUsersRun.$inject = ['UsersService','UsersApi','UsersApiTransformer','UsersFirebaseApi'];
function AbtUsersRun (UsersService,UsersApi,UsersApiTransformer, UsersFirebaseApi) {
	
	UsersService.api = UsersFirebaseApi;
	UsersService.transformer = UsersApiTransformer;

	console.log("UsersServiceProvider", UsersService, UsersFirebaseApi);
}