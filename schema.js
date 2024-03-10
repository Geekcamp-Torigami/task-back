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
    isPomodoro: Boolean
  }

  enum Priority {
    HIGH
    MIDDLE
    LOW
  }

  type Category {
    postedBy: String!
    label: String!
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
    expirationDate: DateTime!
    isCompleted: Boolean = false
    isPomodoro: Boolean = false
    priority: Priority!
  }

  input ChangeCompletedInput {
    id: ID!
    isShort: Boolean!
    isComplete: Boolean!
  }

  input RemoveEachTaskInput {
    isShort: Boolean!
    id: ID!
  }

  input ChangePomodoroInput {
    id: ID!
    isPomodoro: Boolean!
  }

  type Mutation {
    registerTask(input: AddTaskInput!): Task!
    registerShortTask(input: AddShortTaskInput!): ShortTask!
    changeCompleted(input: ChangeCompletedInput!): Int
    removeAllTasks(input: Boolean): Int
    removeEachTask(input: RemoveEachTaskInput!): Int
    removeAllCategories: Int
    changePomodoro(input: ChangePomodoroInput!): Int
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
