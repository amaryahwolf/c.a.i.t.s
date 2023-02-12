const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    explanations: [Explanation]!
  }

  type Explanation {
    _id: ID
    question: String
    response: String
  }
  input Explanation {
    _id: ID
    question: String
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
    saveExplanation(explanationData: Explanation!): User
    removeExplanation(explanationId: ID!): User
  }
`;

module.exports = typeDefs;