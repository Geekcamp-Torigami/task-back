import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    addedTasks: [Task!]!
  }

  type Task {
    id: ID!
    postedBy: String!
    name: String!
  }

  type Query {
    me: User
    allTasks: [Task!]!
  }

  type Mutation {
    addTask(input: String!): Task!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
