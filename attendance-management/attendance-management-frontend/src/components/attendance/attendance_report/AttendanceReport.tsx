"use client";
import CommonTable from "@/components/common/table";
import { AttendanceData } from "@/type/attendance_data";
import { gql, useQuery } from "@apollo/client";
import React from "react";

// GraphQLクエリ
const GET_ATTENDANCES = gql`
  query MyQuery {
    attendances {
      date
      id
      endTime
      holidayWorkTime
      lateNightWorkTime
      overWorkTime
      startTime
      status
      workTime
    }
  }
`;

// テーブルカラム情報を定義
const COLUMNS = [
  "日付",
  "出勤時刻",
  "退勤時刻",
  "勤怠状況",
  "総労働時間",
  "残業時間",
  "深夜労働時間",
  "休日労働時間",
];

const convertAttendanceDataToString = (data: AttendanceData[]) => {
  return data.map((item) => [
    item.date.toString(),
    item.start_time.toString(),
    item.end_time?.toString() ?? "",
    item.status,
    item.work_time?.toString() ?? "0",
  ]);
};

export const AttendanceReport = () => {
  let attendanceData: AttendanceData[] = [];
  const { loading, error, data } = useQuery(GET_ATTENDANCES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (data && data.attendances) {
    // data.attendancesが存在する場合にのみ変換を行います
    attendanceData = data.attendances.map((attendance: any) => ({
      id: attendance.id,
      date: new Date(attendance.date), // 文字列からDate型に変換
      start_time: new Date(attendance.start_time),
      end_time: new Date(attendance.end_time),
      status: attendance.status,
      work_time: attendance.work_time,
      over_work_time: attendance.over_work_time,
      late_night_work_time: attendance.late_night_work_time,
      holiday_work_time: attendance.holiday_work_time,
    }));
  }

  return (
    <div>
      <p>${JSON.stringify(attendanceData)}</p>
      <CommonTable
        columns={COLUMNS}
        datas={convertAttendanceDataToString(attendanceData)}
      />
    </div>
  );
};
