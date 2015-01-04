'use strict';

angular.module('ngTransformer', [])
.provider('$transform', [function() {

	var map = {};
	return {
		setMap: function (newMapVal) {
			map = newMapVal;
		},
		getMap: function () {
			return map;
		},
		$get: function () {
			return new Transfomer(map);
		}
	};
}]);

function Transfomer (map) {
	this.map = map;
}
Transfomer.prototype.parse = function (data) {
	
	var tmp = null,
		map = this.map;

	if (data.length) {
	    data = _.map(data, function(repo) {
	    	if (typeof map.parse === 'function') return map.parse(repo);
	    	tmp = {};
	    	for (var prop in map) {
	    		// if (!map.hasOwnProperty(prop)) continue;
	    		tmp[prop] = repo[map[prop]];
	    	}
	        return tmp;
	    })
	} else {
		data = [];
	}
	return data;
};
Transfomer.prototype.serialize = function (data) {

	var result = [],
		tmp = null,
		map = this.map;

	if (data.length) {
		data.forEach(function (model) {
			if (typeof map.serialize === 'function') return map.serialize(model);
			tmp = {};
			for (var prop in map) {
				// if (!map.hasOwnProperty(prop)) continue;
				tmp[map[prop]] = model[prop];
			}
			result.push(tmp);
		});
	}
	
	return result;
};