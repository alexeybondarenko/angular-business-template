'use strict';

angular.module('abt.users.providers.service',[
	'abt.users.providers.transformer',
	'abt.users.providers.api'
])
.provider('UsersService', UsersServiceProviderObj);

UsersServiceProviderObj.$inject = [];
function UsersServiceProviderObj () {
	return {
		api: null, 
		transformer: null,
		$get: function ($q) {

			function UsersService (api, transformer) {
				this.api = api;
				this.transformer = transformer;
			}
			UsersService.prototype.getUsers = function () {
				var self = this;
				console.log("UsersService:: getUsers", self);
				return $q.when(self.api.getUsers()).then(function(resp) {
					console.info("UsersService:: usersApi response", self.transformer, resp, arguments);
					return self.transformer.parse(resp);
				});
			};

			return new UsersService (this.api, this.transformer);
		}
	};
}