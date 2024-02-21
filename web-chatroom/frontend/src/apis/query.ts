import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query {
    messages {
      text
      createdAt
      userId
    }
  }
`;
