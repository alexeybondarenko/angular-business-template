'use strict';

angular.module('abt.users.providers.service',[
	'abt.users.providers.transformer',
	'abt.users.providers.cache',
	'abt.users.providers.model',
	'abt.users.providers.api'
])
.service('UsersService', UsersService)
.config(UsersProvidersServiceConfig);

UsersProvidersServiceConfig.$inject = ['UsersTransformerPrototypeProvider'];
function UsersProvidersServiceConfig (UsersTransformerPrototypeProvider) {

	UsersTransformerPrototypeProvider.setModel(User);
}

UsersService.$inject = ['$q','UsersCache'];
function UsersService ($q, UsersCache) {
	function UsersServiceObj (api, transformer, cache) {
		this.api = api;
		this.transformer = transformer;
		this.cache = cache;
	}
	UsersServiceObj.prototype.api = null;
	UsersServiceObj.prototype.transformer = null;
	UsersServiceObj.prototype.getUsers = function () {
		var self = this;
		console.log("UsersService:: getUsers", self);
		return $q.when(self.api.getUsers()).then(function(resp) {
			console.info("UsersService:: usersApi response", self.transformer, resp, arguments);
			return self.transformer.parse(resp);
		}).then(function (resp) {
			self.cache.save(resp);
			return resp;
		})
	};
	UsersServiceObj.prototype.getUserIdByObject = function (obj) {
		var data = this.cache.load(),
			id = data.indexOf(obj);
		if (id < 0) throw new TypeError("User ID was not found");
		return id;
	};
	UsersServiceObj.prototype.getUserById = function (id) {
		var data = this.cache.load(),
			idx = parseInt(id);
		return (angular.isNumber(idx)) ? data[idx] : null;
	};

	return new UsersServiceObj(null,null, UsersCache);
}