import { gql } from 'apollo-angular';
import { userFragment } from '../fragment/user.fragment';

export const login = gql`
  query login($email: String!, $password: String!, $include: Boolean!) {
    login(email: $email, password: $password) {
      status
      message
      user {
        ...UserObject
      }
    }
  }
  ${userFragment}
`;

export const logout = gql`
  query {
    logout {
      status
      message
    }
  }
`;

export const renewToken = gql`
  query {
    renewToken {
      status
      message
      user {
        _id
        name
        lastname
        email
        role
      }
    }
  }
`;

export const getUsers = gql`
  query getUsers($include: Boolean!) {
    users {
      status
      message
      users {
        ...UserObject
      }
    }
  }
  ${userFragment}
`;

export const getMe = gql`
  query {
    me {
      status
      message
      user {
        _id
        name
        lastname
        email
        role
      }
    }
  }
`;
