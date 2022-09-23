const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const config = require('../../config/auth.config');

const { RefreshToken, User } = require('../../models');

module.exports = {
  Mutation: {
    async refreshAccessToken(root, args, context) {
      const refreshToken = args.input;
      const token = await RefreshToken.findOne({
        where: { refreshToken },
        include: { model: User }
      });

      if (!token) {
        throw new AuthenticationError('Refresh Token Not Valid');
      }
      const accessToken = jwt.sign({ id: token.User.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      return accessToken;
    }
  }
};
