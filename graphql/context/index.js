/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../../models');
const config = require('../../config/auth.config');
const publicEndpoints = require('../../config/publicEndpoints');

// eslint-disable-next-line no-unused-vars
const verifyToken = async (req, res, next) => {
  const token = (req.headers && req.headers.authorization) || '';
  try {
    if (!token) return res.status(403).send({ message: 'No token provided!' });
    const { id } = await jwt.verify(token, config.secret);

    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};

module.exports = async ({ req, res, next }) => {
  if (req.body && publicEndpoints.indexOf(req.body.operationName) !== -1) {
    return;
  }

  const user = await verifyToken(req, res, next);

  return { user };
};
