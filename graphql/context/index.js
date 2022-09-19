const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const config = require("../../config/auth.config");

const { AuthenticationError } = require('apollo-server-express')

const verifyToken = async (token) => {
  try {
    if (!token) return null;
    const { id } = await jwt.verify(token, config.secret);
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};

module.exports = async ({ req }) => {
  const token = (req.headers && req.headers.authorization) || '';
   const user = await verifyToken(token)
  return { user };
};