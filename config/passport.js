const strategy = require('passport-jwt').Strategy;
const extract = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const access = mongoose.model('users');
const config = require('../config/config');

const options = {};
options.jwtFromRequest = extract.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.secret;

module.exports = (passport) => {
  passport.use(new strategy(options, (payload, done) => {
    access.findById(payload.id).then(user => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    }).catch(err => console.log(err));
  }))
}