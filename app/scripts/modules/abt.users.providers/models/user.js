'use strict';

function User (obj) {
	this.firstName = obj.firstName;
	this.lastName = obj.lastName;
	this.birthDate = new Date(obj.birthDate);
	this.jobTitle = obj.jobTitle;
}

User.prototype.firstName = null;
User.prototype.lastName = null;
User.prototype.birthDate = null;
User.prototype.jobTitle = null;