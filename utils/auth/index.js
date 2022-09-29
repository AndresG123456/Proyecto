const passport = require('passport');
const LocalStategy = require('./stategies/local.stategy');
const JwtStrategy = require('./stategies/jwt.stategy');

passport.use(LocalStategy);
passport.use(JwtStrategy);
