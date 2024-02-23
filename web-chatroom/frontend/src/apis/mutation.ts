import { gql } from "@apollo/client";

export const POST_MESSAGE_MUTATION = gql`
  mutation ($input: NewMessage!) {
    postMessage(input: $input) {
      id
      userId
      text
      createdAt
    }
  }
`;
