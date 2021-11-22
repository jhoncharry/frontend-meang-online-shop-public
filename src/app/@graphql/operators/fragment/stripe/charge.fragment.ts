import gql from 'graphql-tag';

export const chargeFragment = gql`
  fragment ChargeObject on StripeCharge {
    id
    card
    paid
    description
    customer
    created
    amount
    status
    receiptUrl
    receiptEmail
    typeOrder
  }
`;
