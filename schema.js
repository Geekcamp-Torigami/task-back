import { gql } from "apollo-server-express";
export const typeDefs = gql`
  input AddTaskInput {
    name: String!
  }

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
  }

  type Mutation {
    addTask(input: AddTaskInput!): Task!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
