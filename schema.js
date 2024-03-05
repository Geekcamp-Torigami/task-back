import { gql } from "apollo-server-express";
export const typeDefs = gql`
  scalar DateTime
  type User {
    id: ID!
    email: String!
    addedTasks: [Task!]!
  }

  type Task {
    id: ID!
    postedBy: String!
    name: String!
    limitDate: DateTime
  }

  type Query {
    me: User
    allTasks: [Task!]!
  }

  input AddTaskInput{
    name: String!
    limitDate: DateTime
  }

  type Mutation {
    addTask(input: AddTaskInput!): Task!
    removeAllTasks: Int
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
