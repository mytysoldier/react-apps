import { AttendanceReport, WorkReport } from "@/components/attendance";
import { Alert } from "@/components/timecard/disptime/alert/Alert";
import React from "react";

export default function Page() {
  return (
    <div className="w-full">
      <div className="py-4 px-8 text-2xl">出勤簿</div>
      <div className="flex items-center py-4 px-8">
        <span className="mr-8 text-2xl">太郎</span>
        <Alert />
      </div>
      <div>
        <WorkReport />
      </div>
      <div className="mt-8 px-8">
        <AttendanceReport />
      </div>
    </div>
  );
}
