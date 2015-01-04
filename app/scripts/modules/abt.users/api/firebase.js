'use strict';

angular.module('abt.users.api.firebase',[
	'abt.users.providers.api',
	'abt.users.providers.transformer',
	'firebase',
])
.provider('UsersFirebaseApi', UsersFirebaseApiProvider)
.provider('UsersFirebaseApiTransformer',UsersFirebaseApiTransformer);

/*****************************
* Firebase Api Configuration *
******************************/ 

UsersFirebaseApiTransformer.$inject = ['UsersTransformerPrototypeProvider'];
function UsersFirebaseApiTransformer (UsersTransformerPrototypeProvider) {
	
	var firebaseTransformer = Object.create(UsersTransformerPrototypeProvider);
	console.log("Firebase api transformer", firebaseTransformer);
	// transformation map for Firebase backend response objects
	var firebaseTransformerMap = {
		parse: function(item) {
			console.log("Firebase parse", item);
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
			console.log("Firebase serialize", item);
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
	};
	firebaseTransformer.setMap(firebaseTransformerMap);
	return firebaseTransformer;
}

function UsersFirebaseApiProvider () {
	return {
		url: '',
		$get: UsersFirebaseApi
	};
}
UsersFirebaseApi.$inject = ['$firebase','UsersApiPrototype','$q'];
function UsersFirebaseApi ($firebase, UsersApiPrototype, $q) {
	var ref = new Firebase (this.url);
	// create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object
    var data = sync.$asArray();
    // return user loading promise
    function UsersApiObj () {}
	UsersApiObj.prototype = new UsersApiPrototype ();

    UsersApiObj.prototype.getUsers = function () {
    	console.info("UsersFirebaseApi: getUsers");
    	return data.$loaded();
	};
	return new UsersApiObj ();
}