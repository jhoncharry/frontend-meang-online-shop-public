import { gql } from 'apollo-angular';

export const createCustomer = gql`
  mutation createClient($name: String!, $email: String!) {
    createCustomer(name: $name, email: $email) {
      status
      message
      customer {
        id
        name
        email
        description
      }
    }
  }
`;
