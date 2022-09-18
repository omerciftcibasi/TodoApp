const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require('apollo-server-express');
//const { typeDefs, resolvers } = require('./schema');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const context = require('./graphql/context');
const allowedOrigins = require('./config/corsOrigins')

const app = express();

let apolloServer = null;
  async function startServer() {
      apolloServer = new ApolloServer({
          typeDefs,
          resolvers,
          context
      });
      await apolloServer.start();
      apolloServer.applyMiddleware({ app, path: '/api' });
  }

  startServer();

var corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

const db = require("./models");
db.sequelize.sync();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// simple route

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});