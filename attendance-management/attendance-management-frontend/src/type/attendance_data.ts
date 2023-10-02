export type AttendanceData = {
  id: number;
  date: Date;
  start_time: Date;
  end_time?: Date;
  break_start_time?: Date;
  break_end_time?: Date;
  status: string;
  work_time?: number;
  over_work_time?: number;
  late_night_work_time?: number;
  holiday_work_time?: number;
};
