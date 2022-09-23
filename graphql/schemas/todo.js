const { gql } = require('apollo-server-express');

module.exports = gql`

 type Todo {
     id: Int!
     title: String!
     isCompleted: Boolean!
     userId: Int!
 }

 extend type Mutation {
     createTodo(title: String!): Todo
     updateTodo(id: Int!, isCompleted: Boolean!): Boolean! 
     deleteTodo(id: Int!) : Int!
 }

 extend type Query {
    listTodos:[Todo]
 }


`;
