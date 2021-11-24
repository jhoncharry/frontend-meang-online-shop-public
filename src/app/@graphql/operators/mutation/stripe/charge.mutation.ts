import { gql } from 'apollo-angular';
import { chargeFragment } from '../../fragment/stripe/charge.fragment';

export const payOrder = gql`
  mutation payOrder(
    $payment: ChargeInput!
    $stockChanges: [StoreProductStockInput!]!
  ) {
    chargeOrder(payment: $payment, stockChange: $stockChanges) {
      status
      message
      charge {
        ...ChargeObject
      }
    }
  }
  ${chargeFragment}
`;
