const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require("../../config/auth.config");

const { AuthenticationError } = require('apollo-server-express');

const { RefreshToken, User } = require('../../models');

module.exports = {
  Mutation: {
    async refreshAccessToken(root, args, context) {
      const refreshToken = args.input
      const token = await RefreshToken.findOne({ where: { refreshToken }, include: {
      model: User }});

      if (!token) {
        throw new AuthenticationError('Refresh Token Not Valid');
      }
      var accessToken = jwt.sign({ id: token.User.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      return accessToken;
    }
  }
};