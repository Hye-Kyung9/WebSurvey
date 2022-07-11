const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    User.findOne({ where: { email } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });
  local();
};