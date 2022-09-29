const { Strategy } = require('passport-local');
const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');

const UserService = require('../../../services/user.service');

const service = new UserService();

const LocalStategy = new Strategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
);

module.exports = LocalStategy;
