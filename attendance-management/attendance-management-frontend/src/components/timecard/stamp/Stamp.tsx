import {
  GET_TODAY_ATTENDANCE_QUERY,
  REGISTER_ATTENDANCE_MUTATION,
  UPDATE_ATTENDANCE_BREAK_END_MUTATION,
  UPDATE_ATTENDANCE_BREAK_START_MUTATION,
  UPDATE_ATTENDANCE_END_WORK_MUTATION,
} from "@/api/attendance";
import { StampItem } from "./stamp_item/StampItem";
import { useMutation, useQuery } from "@apollo/client";

export const Stamp = () => {
  // TODO あとでdata削除
  const [registerAttendance, { data }] = useMutation(
    REGISTER_ATTENDANCE_MUTATION
  );
  const [updateAttendanceEndWork] = useMutation(
    UPDATE_ATTENDANCE_END_WORK_MUTATION
  );
  const [updateAttendanceBreakStart] = useMutation(
    UPDATE_ATTENDANCE_BREAK_START_MUTATION
  );
  const [updateAttendanceBreakEnd] = useMutation(
    UPDATE_ATTENDANCE_BREAK_END_MUTATION
  );

  const {
    loading,
    error,
    data: queryData,
    refetch,
  } = useQuery(GET_TODAY_ATTENDANCE_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(`queryData: ${JSON.stringify(queryData)}`);

  return (
    <>
      <div className="flex gap-16">
        <div>
          <StampItem
            text="出勤"
            // 出勤打刻済みなら非活性
            disabled={queryData["todayAttendance"]}
            onClick={async () => {
              try {
                const startTime = new Date().toISOString();
                await registerAttendance({
                  variables: {
                    status: "勤務",
                    startTime: startTime,
                  },
                });
                const id = data?.registerAttendance?.id;
                console.log(`出勤登録 id: ${id}`);
                refetch();
                console.log(`update queryData: ${JSON.stringify(queryData)}`);
              } catch (error) {
                console.error("エラー:", error);
              }
            }}
          />
        </div>
        <div>
          <StampItem
            text="退勤"
            // 当日の勤怠未登録もしくは退勤打刻済みなら非活性
            disabled={
              !queryData["todayAttendance"] ||
              queryData["todayAttendance"]?.endTime
            }
            onClick={async () => {
              try {
                const endTime = new Date().toISOString();
                await updateAttendanceEndWork({
                  variables: {
                    id: queryData?.todayAttendance?.id,
                    endTime: endTime,
                  },
                });
                console.log(`退勤登録 id: ${data?.registerAttendance?.id}`);
              } catch (error) {
                console.error("エラー:", error);
              }
            }}
          />
        </div>
      </div>
      <div className="flex gap-16 mt-16">
        <div>
          <StampItem
            text="休憩入り"
            // 当日の勤怠未登録もしくは休憩入りもしくは退勤打刻済みなら非活性
            disabled={
              !queryData["todayAttendance"] ||
              queryData["todayAttendance"]?.breakStartTime ||
              queryData["todayAttendance"]?.endTime
            }
            onClick={async () => {
              try {
                const breakStartTime = new Date().toISOString();
                await updateAttendanceBreakStart({
                  variables: {
                    id: queryData?.todayAttendance?.id,
                    breakStartTime: breakStartTime,
                  },
                });
                console.log(`休憩入り登録 id: ${data?.registerAttendance?.id}`);
              } catch (error) {
                console.error("エラー:", error);
              }
            }}
          />
        </div>
        <div>
          <StampItem
            text="休憩戻り"
            // 当日の勤怠未登録もしくは休憩戻りもしくは退勤打刻済みなら非活性
            disabled={
              !queryData["todayAttendance"] ||
              queryData["todayAttendance"]?.breakEndTime ||
              queryData["todayAttendance"]?.endTime
            }
            onClick={async () => {
              try {
                const breakEndTime = new Date().toISOString();
                await updateAttendanceBreakEnd({
                  variables: {
                    id: queryData?.todayAttendance?.id,
                    breakEndTime: breakEndTime,
                  },
                });
                console.log(`休憩戻り登録 id: ${data?.registerAttendance?.id}`);
              } catch (error) {
                console.error("エラー:", error);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
