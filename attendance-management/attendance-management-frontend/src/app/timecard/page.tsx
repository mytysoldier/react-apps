import { Disptime, Stamp } from "@/components/timecard";
import React from "react";

export default function Page() {
  return (
    <div>
      <div className="py-4 px-8 text-2xl">打刻</div>
      <div className="flex">
        <div className="w-1/2">
          <Disptime />
        </div>
        <div className="w-1/2">
          <Stamp />
        </div>
      </div>
    </div>
  );
}
