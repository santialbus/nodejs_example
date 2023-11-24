const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('./keys');
const User = require('../models/user')

module.exports = (passport) => {
    let options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    options.secretOrKey = keys.secretOrKey;

    passport.use(new JwtStrategy(options, (jwt_payload, done) => {

        User.findById(jwt_payload.id, (err, user) => {

            if (err) {
                return done(err, false)
            }
            if(user) {
                return done(null, user)
            }
            else {
                return done(null, false)
            }

        })

    }))

}