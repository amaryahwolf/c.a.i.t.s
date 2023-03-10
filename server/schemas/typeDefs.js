const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    explanations: [Explanation]!
  }

  type Explanation {
    explanationId: ID
    question: String
    response: String
  }
  type Response {
    response: String
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
    # Add mutation for AI generated response
    addExplanation(question: String!): Response
    removeExplanation(explanationId: ID!): User
  }
`;

module.exports = typeDefs;
