import { Disptime, Stamp } from "@/components/timecard";
import React from "react";

export default function Page() {
  return (
    <div className="flex">
      <div className="w-1/2">
        <Disptime />
      </div>
      <div className="w-1/2">
        <Stamp />
      </div>
    </div>
  );
}
