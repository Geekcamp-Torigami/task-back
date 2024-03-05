import { gql } from "apollo-server-express";
export const typeDefs = gql`
  scalar DateTime
  type User {
    id: ID!
    email: String!
    registeredTasks: [Task!]!
    registeredShortTasks: [ShortTask!]!
  }

  type Task {
    id: ID!
    postedBy: String!
    name: String!
    category: String
    limitDate: DateTime
    isCompleted: Boolean!
    priority: Priority!
  }

  type ShortTask {
    id: ID!
    postedBy: String!
    name: String!
    category: String
    expirationDate: DateTime!
    isCompleted: Boolean!
    priority: Priority!
  }

  enum Priority {
    HIGH
    MIDDLE
    LOW
  }

  type Category {
    postedBy: String!
    category: String
  }

  type Query {
    me: User
    allRegisteredTasks: [Task!]!
    allRegisteredShortTasks: [ShortTask!]!
    allCategories: [Category!]!
  }

  input AddTaskInput {
    name: String!
    category: String
    limitDate: DateTime
    isCompleted: Boolean = false
    priority: Priority!
  }

  input AddShortTaskInput {
    name: String!
    category: String
    expirationDate: DateTime
    isCompleted: Boolean = false
    priority: Priority!
  }

  type Mutation {
    registerTask(input: AddTaskInput!): Task!
    registerShortTask(input: AddShortTaskInput!): ShortTask!
    removeAllTasks: Int
    removeEachTask(input: ID!): Int
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
