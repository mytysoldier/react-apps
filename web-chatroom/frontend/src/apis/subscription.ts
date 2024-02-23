import { gql } from "@apollo/client";

export const MESSAGE_POSTED_SUBSCRIPTION = gql`
  subscription ($userID: ID!) {
    messagePosted(userId: $userID) {
      id
      userId
      text
      createdAt
    }
  }
`;
