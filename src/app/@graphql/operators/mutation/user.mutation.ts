import { gql } from 'apollo-angular';
import { userFragment } from '../fragment/user.fragment';

export const register = gql`
  mutation registerUser($user: UserCreateInput!, $include: Boolean!) {
    register(userInput: $user) {
      status
      message
      user {
        ...UserObject
      }
    }
  }
  ${userFragment}
`;

export const activateUserEmailToken = gql`
  mutation {
    verifyUserActivateEmail {
      status
      message
    }
  }
`;

export const sendUserResetPasswordEmail = gql`
  mutation forgotPassword($email: String!) {
    sendUserResetPasswordEmail(email: $email) {
      status
      message
    }
  }
`;

export const verifyUserResetPasswordEmail = gql`
  mutation changePassword($password: String!) {
    verifyUserResetPasswordEmail(password: $password) {
      status
      message
    }
  }
`;
