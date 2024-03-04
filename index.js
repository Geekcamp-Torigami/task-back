import express from "express";
import { ApolloServer } from "apollo-server-express";
import { admin } from "./firebase.js";
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
      const tokenId = req.headers["authorization"];
      if (tokenId) {
        const decoded = await admin.auth().verifyIdToken(tokenId);
        const currentUser = await db
          .collection("users")
          .findOne({ id: decoded.uid, email: decoded.email });
        if (currentUser) {
          return { db, currentUser };
        } else {
          const currentUser = {
            id: decoded.uid,
            email: decoded.email,
          };
          await db.collection("users").insertOne({ currentUser });
          return { db, currentUser };
        }
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
