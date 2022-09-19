const { gql } = require('apollo-server-express');

module.exports = gql`
 
 scalar Date

 type RefreshToken {
     id: Int!
     refreshToken: String!
     expiryDate: Date!
     userId: Int!
 }

 extend type Mutation {
    refreshAccessToken(input: String!): String!
 }
`;