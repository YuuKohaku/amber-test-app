'use strict'

const Storage = require("../storage/storage.js");

class User{
	static serialize(user, done) {
  		done(null, user.username);
	}

	static deserialize(username, done) {
		let user = Storage.get("users", username);

		if(!user)
			done(new Error("No such user."), null);
    	done(null, user);
	}

	static authenticate(username, password, done) {
	  	let user = Storage.get("users", username);
	  	console.log("-->",user)
	      if (!user) {
	      	user = {
	      		username: username,
	      		password: password,
	      		active: false
	      	};
	      }
	      console.log(user, username, password)
	      user.active = true;
	      Storage.set("users", username, user);
	      if (user.password != password) {
	      	done(null, false, { error: 'Incorrect password.' });
	      }
	      done(null, user);
  	}
}

module.exports = User;