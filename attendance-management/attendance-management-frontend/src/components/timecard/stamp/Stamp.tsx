import { REGISTER_ATTENDANCE_MUTATION } from "@/api/attendance";
import { StampItem } from "./stamp_item/StampItem";
import { useMutation } from "@apollo/client";

export const Stamp = () => {
  const [registerAttendance, { data }] = useMutation(
    REGISTER_ATTENDANCE_MUTATION
  );
  return (
    <>
      <div className="flex gap-16">
        <div>
          <StampItem
            text="出勤"
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
              } catch (error) {
                console.error("エラー:", error);
              }
            }}
          />
        </div>
        <div>
          <StampItem text="退勤" />
        </div>
      </div>
      <div className="flex gap-16 mt-16">
        <div>
          <StampItem text="直行" />
        </div>
        <div>
          <StampItem text="直帰" />
        </div>
      </div>
      <div className="flex gap-16 mt-16">
        <div>
          <StampItem text="休憩入り" />
        </div>
        <div>
          <StampItem text="休憩戻り" />
        </div>
      </div>
    </>
  );
};
