//Passport configuration file
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Admin = require('../schemas/adminAPI');

const config = require('../config/database');

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {        
        Admin.getAdminById(jwt_payload._id, function (err, admin) {                       
            if (err) {
                return done(err, false);
            }

            if (admin) {
                return done(null, admin);
            }else {
                return done(null, false);
            }
        });
    }));
}