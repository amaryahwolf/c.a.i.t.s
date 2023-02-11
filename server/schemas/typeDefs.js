const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: _id
    username: String
    email: String
    password: String
    prompts: [Prompt]!
}

type Prompt {
    _id: _id
    difficulty: String
    language: String
    prompt: String
    question: String
    response: String
    feedback: String
}

type Auth {
    token: ID!
    user: User
}

# TODO: add queries
type Query {

}

# TODO: add mutations
type Mutation {

}

`;

module.exports = typeDefs;