import { gql } from "apollo-server-express";
export const typeDefs = gql`
  scalar DateTime
  type User {
    id: ID!
    email: String!
    registeredTasks: [Task!]!
  }

  type Task {
    id: ID!
    postedBy: String!
    name: String!
    category: String
    limitDate: DateTime
    isTemporary: Boolean!
    isCompleted: Boolean!
  }

  type Category {
    postedBy: String!
    category: String
  }

  type Query {
    me: User
    allRegisteredTasks: [Task!]!
    allCategories: [Category!]!
  }

  input AddTaskInput {
    name: String!
    category: String
    limitDate: DateTime
    isTemporary: Boolean!
    isCompleted: Boolean = false
  }

  type Mutation {
    registerTask(input: AddTaskInput!): Task!
    removeAllTasks: Int
    removeEachTask(input: ID!): Int
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
