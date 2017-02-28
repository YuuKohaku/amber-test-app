'use strict'
const storage = require("./mock-storage.js");
const _ = require("lodash");

class JSONStorage{
	get(subset, key){
		return storage[subset] && storage[subset][key] || undefined;
	}

	getMulti(subset, keys){
		return _.reduce(keys, (acc, key) => {
			acc[key] = this.get(subset, key);
			return acc;
		},{});
	}

	set(subset, key, value){
		storage[subset] = storage[subset] || {};
		storage[subset][key] = value;
	}

	find(subset, query){
		if(!storage[subset])
			return [];
		return _.filter(storage[subset], query);
	}

	remove(subset, key){
		_.unset(storage, [subset, key]);
	}
}

//storage as a singletone is sufficient here
let instance = new JSONStorage();
module.exports = instance;