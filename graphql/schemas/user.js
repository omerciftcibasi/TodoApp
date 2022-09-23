const { gql } = require('apollo-server-express');

module.exports = gql`

 type User {
     id: Int!
     name: String!
     email: String!
     password: String!
 }

 extend type Mutation {
     signUp(input: SignUpInput!): SignUpResponse
     login(input: LoginInput!): LoginResponse
 }

 type SignUpResponse {
    id: Int!
    name: String!
    email: String!
 }

 input SignUpInput {
     name: String!
     email: String!
     password: String!
 }

 input LoginInput {
     email: String!
     password: String!
 }

 type LoginResponse {
    id: Int!
    name: String!
    email: String!
    accessToken: String!
    refreshToken: String!
 }
`;
