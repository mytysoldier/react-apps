"use client";
import CommonTable from "@/components/common/table";
import { AttendanceData } from "@/type/attendance_data";
import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";
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
      breakStartTime
      breakEndTime
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
    format(item.date, "MM/dd(EEE)", { locale: ja }),
    format(item.start_time, "HH:mm"),
    item.end_time != null ? format(item.end_time, "HH:mm") : "",
    item.status,
    item.work_time?.toString() ?? "0",
    item.over_work_time?.toString() ?? "0",
    item.late_night_work_time?.toString() ?? "0",
    item.holiday_work_time?.toString() ?? "0",
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
      start_time: new Date(attendance.startTime),
      end_time: new Date(attendance.endTime),
      status: attendance.status,
      work_time: attendance.workTime,
      over_work_time: attendance.overWorkTime,
      late_night_work_time: attendance.lateNightWorkTime,
      holiday_work_time: attendance.holidayWorkTime,
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
