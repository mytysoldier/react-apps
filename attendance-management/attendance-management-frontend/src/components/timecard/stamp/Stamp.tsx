import { REGISTER_ATTENDANCE_MUTATION } from "@/api/attendance";
import { StampItem } from "./stamp_item/StampItem";
import { useMutation } from "@apollo/client";

export const Stamp = () => {
  const [registerAttendance] = useMutation(REGISTER_ATTENDANCE_MUTATION);
  return (
    <>
      <div className="flex gap-16">
        <div>
          <StampItem
            text="出勤"
            onClick={async () => {
              console.log("test");
              try {
                const startTime = new Date(
                  "2023-09-22T15:45:30Z"
                ).toISOString();
                await registerAttendance({
                  variables: {
                    status: "test",
                    startTime: "2023-09-22T15:45:30Z",
                    // startTime: startTime,
                  },
                });
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
