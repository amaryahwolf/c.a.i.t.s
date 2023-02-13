import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_EXPLANATION = gql`
mutation addExplanation($question: String) {
    addExplanation(question: $question) {
      _id
      question
      response
    }
  }
  `;

export const REMOVE_EXPLANATION = gql`
mutation removeExplanation($explanationId: ID!) {
  removeExplanation(explanationId: $explanationId) {
    _id
    username
    email
    explanations {
      _id
      question
      response
    }
  }
}
``