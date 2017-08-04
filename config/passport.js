var jwtStrategy = require('passport-jwt').Strategy;
var extractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user.js');
var config = require('../config/main.js');

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = extractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new jwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            } else if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};
