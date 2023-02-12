const { gql } = require("apollo-server-express");

// gql doesnt have - very few types.

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    prompts: [Prompt]!
  }

  type Prompt {
    _id: ID
    difficulty: String
    language: String
    topic: String
    prompt: String
    question: String
    response: String
    feedback: String
  }
  input Prompt {
    difficulty: String
    language: String!
    topic: String
    prompt: String
    question: String
    response: String
    feedback: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;