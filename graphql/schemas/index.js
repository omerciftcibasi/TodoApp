const { gql } = require('apollo-server-express');
const userType = require('./user');
const todoType = require('./todo');
const refreshTokenType = require('./refreshToken');

const rootType = gql`
 type Query {
     root: String
 }
 type Mutation {
     root: String
 }

`;

module.exports = [rootType, userType, todoType, refreshTokenType];
