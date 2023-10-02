import { gql } from "@apollo/client";

export const REGISTER_ATTENDANCE_MUTATION = gql`
  mutation RegisterAttendance($status: String!, $startTime: DateTime!) {
    registerAttendance(status: $status, startTime: $startTime) {
      id
      status
    }
  }
`;

export const UPDATE_ATTENDANCE_END_WORK_MUTATION = gql`
  mutation UpdateAttendanceEndWork($id: Int!, $endTime: DateTime!) {
    updateAttendance(id: $id, endTime: $endTime) {
      id
      status
    }
  }
`;

export const GET_TODAY_ATTENDANCE_QUERY = gql`
  query GetTodayAttendance {
    todayAttendance {
      id
      date
      endTime
    }
  }
`;
