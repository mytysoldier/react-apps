import React from "react";
import { Workdays } from "./workdays/Workdays";
import { Workhours } from "./workhours/Workhours";
import { Holidays } from "./holidays/Holidays";

export const WorkReport = () => {
  return (
    <div>
      <div>
        <Workdays />
      </div>
      <div>
        <Workhours />
      </div>
      <div>
        <Holidays />
      </div>
    </div>
  );
};
