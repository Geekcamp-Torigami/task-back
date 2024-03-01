const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    githubLogin: ID!
    name: String
    avatar: String
  }

  type Query{
    totalUsers: Int!
    allUsers: [User]
  }

  type Mutation {
    addUser (
        name: String!
        githubLogin: String
        avatar: String
    ):User!
  }

  schema {
    query: Query
    mutation:Mutation
  }
`;

module.exports = typeDefs;
