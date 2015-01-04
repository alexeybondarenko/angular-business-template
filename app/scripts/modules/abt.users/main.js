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
    // download the data into a local object
    var data = sync.$asArray();
    // return user loading promise
    this.getUsers = function () {
    	console.info("UsersFirebaseApi: getUsers");
    	return data.$loaded();
	};
}
AbtUsersConfig.$inject = ['UsersApiTransformerProvider'];
function AbtUsersConfig (UsersApiTransformerProvider) {
	UsersApiTransformerProvider.setMap({
		parse: function(item) {
			// parsing date from Firebase backend
			function parseDate (s) {
			  var re = /^(\d\d)-(\d\d)-(\d{4}) (\d\d):(\d\d):(\d\d)$/;
			  var m = re.exec(s);
			  return m ? new Date(m[3], m[2]-1, m[1], m[4], m[5], m[6]) : null;
			}
			// parsed model object
			return {
				firstName: item['first_name'], 
				lastName: item['last_name'], 
				birthDate: parseDate(item['birth_day']+' 00:00:00'),
				jobTitle: item['job_title']
			};
		}, 
		serialize: function (item) {
			// serialize date for Firebase backend
			function serializeDate (s) {
				var date = new Date(s);
				var mm = date.getMonth() + 1,
					dd = date.getDate(),
					yyyy = date.getFullYear();

				if (mm < 10) mm = '0'+mm;
				if (dd < 10) dd = '0'+dd;

				return dd+'-'+mm+'-'+yyyy;
			}
			// serialized object
			return {
				first_name: item.firstName,
				last_name: item.lastName,
				birth_day: serializeDate(item.birthDate),
				job_title: item.jobTitle
			};
		}
	});	
}

AbtUsersRun.$inject = ['UsersService','UsersApi','UsersApiTransformer','UsersFirebaseApi'];
function AbtUsersRun (UsersService,UsersApi,UsersApiTransformer, UsersFirebaseApi) {
	
	UsersService.api = UsersFirebaseApi;
	UsersService.transformer = UsersApiTransformer;

	console.log("UsersServiceProvider", UsersService, UsersFirebaseApi);
}