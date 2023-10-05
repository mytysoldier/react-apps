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

// その月の日にちを一覧取得
const getDaysInMonth = (year: number, month: number): Date[] => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  const daysInMonth = [];
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    daysInMonth.push(new Date(date));
  }
  return daysInMonth;
};

// 月のレポートデータを生成
const generateMonthlyData = (
  year: number,
  month: number,
  data: AttendanceData[]
) => {
  const monthDates = getDaysInMonth(year, month);
  const monthlyData = monthDates.map((date) => {
    const attendanceData = data.find((item) => {
      const itemDate = new Date(item.date);
      return itemDate.getDate() === date.getDate();
    });

    if (attendanceData) {
      return {
        date: date,
        start_time: attendanceData.start_time,
        end_time: attendanceData.end_time,
        status: attendanceData.status,
        work_time: attendanceData.work_time,
        over_work_time: attendanceData.over_work_time,
        late_night_work_time: attendanceData.late_night_work_time,
        holiday_work_time: attendanceData.holiday_work_time,
      };
    } else {
      return {
        date: date,
        start_time: null,
        end_time: null,
        status: "",
        work_time: null,
        over_work_time: null,
        late_night_work_time: null,
        holiday_work_time: null,
      };
    }
  });

  return monthlyData;
};

const convertAttendanceDataToString = (data: AttendanceData[]) => {
  // 今月のデータを生成
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const monthlyData = generateMonthlyData(currentYear, currentMonth, data);

  // データを変換
  const convertedData = monthlyData.map((item) => [
    format(item.date, "MM/dd(EEE)", { locale: ja }),
    item.start_time ? format(item.start_time, "HH:mm") : "",
    item.end_time != null ? format(item.end_time, "HH:mm") : "",
    item.status,
    item.work_time?.toString() ?? "0",
    item.over_work_time?.toString() ?? "0",
    item.late_night_work_time?.toString() ?? "0",
    item.holiday_work_time?.toString() ?? "0",
  ]);

  return convertedData;

  // return data.map((item) => [
  //   format(item.date, "MM/dd(EEE)", { locale: ja }),
  //   format(item.start_time, "HH:mm"),
  //   item.end_time != null ? format(item.end_time, "HH:mm") : "",
  //   item.status,
  //   item.work_time?.toString() ?? "0",
  //   item.over_work_time?.toString() ?? "0",
  //   item.late_night_work_time?.toString() ?? "0",
  //   item.holiday_work_time?.toString() ?? "0",
  // ]);
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
