import { gql } from 'apollo-angular';
import { chargeFragment } from '../../fragment/stripe/charge.fragment';

export const payOrder = gql`
  mutation payOrder($payment: ChargeInput!) {
    chargeOrder(payment: $payment) {
      status
      message
      charge {
        ...ChargeObject
      }
    }
  }
  ${chargeFragment}
`;
