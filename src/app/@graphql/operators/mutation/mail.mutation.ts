import { gql } from 'apollo-angular';

export const sendEmail = gql`
  mutation sendingTestEmail($mail: MailInput!) {
    sendEmail(mail: $mail) {
      status
      message
      mail {
        from
        to
        subject
        html
      }
    }
  }
`;
