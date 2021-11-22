import { gql } from 'apollo-angular';
import { chargeFragment } from '../../fragment/stripe/charge.fragment';

export const chargesCustomer = gql`
  query getChargesCustomer(
    $customer: ID!
    $limit: Int
    $startingAfter: ID
    $endingBefore: ID
  ) {
    chargesByCustomer(
      customer: $customer
      limit: $limit
      startingAfter: $startingAfter
      endingBefore: $endingBefore
    ) {
      status
      message
      hasMore
      charges {
        ...ChargeObject
      }
    }
  }
  ${chargeFragment}
`;
