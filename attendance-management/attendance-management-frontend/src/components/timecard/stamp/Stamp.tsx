import { StampItem } from "./stamp_item/StampItem";

export const Stamp = () => {
  return (
    <>
      <div className="flex gap-16">
        <div>
          <StampItem text="出勤" />
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
