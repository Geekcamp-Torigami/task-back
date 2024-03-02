import express from "express";
import { ApolloServer } from "apollo-server-express";
import { connectMongoDb } from "./mongodb.js";
import expressPlayground from "graphql-playground-middleware-express";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers/index.js";

const start = async () => {
  //setup mongodb
  const db = await connectMongoDb();

  //set up express server
  const app = express();
  app.get("/", (req, res) => res.send("Welcome to the PhotoShare API"));
  app.get("/", expressPlayground.default({ endpoint: "/graphql" }));

  //set up graphql server
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
    context: async ({ req }) => {
      const githubToken = req.headers["authorization"];
      if (githubToken) {
        const currentUser = await db
          .collection("users")
          .findOne({ githubToken });
        return { db, currentUser };
      } else {
        return { db, currentUser: null };
      }
    },
  });
  await server.start();
  app.listen({ port: 4000 }, () => {
    console.log(
      `GraphQL Service running at http://localhost:4000${server.graphqlPath}`
    );
  });
  server.applyMiddleware({ app });
};

start();
