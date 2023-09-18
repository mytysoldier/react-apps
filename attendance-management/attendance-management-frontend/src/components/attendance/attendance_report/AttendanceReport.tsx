"use client";
import { AttendanceData } from "@/type/attendance_data";
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useTable } from "react-table";

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

// データを準備
const data_temp = [
  {
    date: "John",
    workInOut: "Doe",
    status: "",
    workHour: "",
    overWork: "",
    lateNightWork: "",
    holidayWork: "",
  },
  // { date: "Jane", workHour: "Smith" },
  // { date: "Bob", workHour: "Johnson" },
  // 他のデータを追加
];

// カラム情報を定義
const columns = [
  {
    Header: "日付",
    accessor: "date",
  },
  {
    Header: (
      <>
        実績(出)
        <br />
        実績(退)
      </>
    ),
    accessor: "workInOut",
  },
  {
    Header: "勤怠状況",
    accessor: "status",
  },
  {
    Header: "総労働時間",
    accessor: "workHour",
  },
  {
    Header: "残業時間",
    accessor: "overWork",
  },
  {
    Header: "深夜労働時間",
    accessor: "lateNightWork",
  },
  {
    Header: "休日労働時間",
    accessor: "holidayWork",
  },
  {
    Header: "申請/修正/詳細",
    // accessor: "date7",
  },
] as const;

export const AttendanceReport = () => {
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({
  //     columns,
  //     data,
  //   });
  const { loading, error, data } = useQuery(GET_ATTENDANCES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(`data: ${JSON.stringify(data)}`);

  // データを適切に変換する
  let attendanceData: AttendanceData[] | undefined;

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
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({
  //     columns,
  //     data,
  //   });
  return (
    <div>
      <p>${JSON.stringify(attendanceData)}</p>
      {/* <table
        {...getTableProps()}
        className="border-collapse border border-green-800"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="p-2 border border-green-800"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-green-100">
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="p-2 border border-green-800"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
};
