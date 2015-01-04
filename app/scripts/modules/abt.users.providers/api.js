'use strict';

angular.module('abt.users.providers.api',[])
.constant('UsersApiPrototype', UsersApiPrototype);

function UsersApiPrototype () {}
UsersApiPrototype.prototype.getUsers = function () {
	throw new TypeError ("Undeclarated getUsers method");
}