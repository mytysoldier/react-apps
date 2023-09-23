import { gql } from "@apollo/client";

export const REGISTER_ATTENDANCE_MUTATION = gql`
  mutation RegisterAttendance($status: String!, $startTime: DateTime!) {
    registerAttendance(status: $status, startTime: $startTime) {
      id
      status
    }
  }
`;
