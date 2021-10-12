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
