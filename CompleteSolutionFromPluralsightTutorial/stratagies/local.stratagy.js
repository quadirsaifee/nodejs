var passport = require('passport'),
	LocalStratagy = require('passport-local').Stratagy;
module.exports = function () {
	passport.use(new LocalStratagy({
		usernameField: 'userName',
		passwordField:'password'
	}, function (username,password,done) {
		var user = {
			username: username,
			password: password

		};
		done(null, user);
	}));
};