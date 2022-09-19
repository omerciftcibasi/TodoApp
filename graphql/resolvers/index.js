const userResolvers = require('./user');
const todoResolvers = require('./todo');
const refreshTokenResolvers = require('./refreshToken');

module.exports = [userResolvers, todoResolvers, refreshTokenResolvers];