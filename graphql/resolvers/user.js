const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require("../../config/auth.config");

const { AuthenticationError } = require('apollo-server-express');

const { User, RefreshToken } = require('../../models');

module.exports = {
  Mutation: {
    async signUp(root, args, context) {

      const { name, email, password } = args.input;
      
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new AuthenticationError('Already Registered!..');
      }
      return User.create({ firstName: name, email, password: bcrypt.hashSync(password, 8) });
    },

    async login(root, { input }, context) {

      const { email, password } = input;
 
      const user = await User.findOne({ where: { email } });

      if (user && bcrypt.compareSync(password, user.password)) {
        var accessToken = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration
          });
    
        let refreshToken =  await RefreshToken.createToken(user);

        return { ...user.toJSON(), accessToken, refreshToken };
      }
      throw new AuthenticationError('Invalid credentials');
    },
  },
};