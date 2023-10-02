"use client";
import React from "react";
import { PulldownItem } from "../pulldown_item/PulldownItem";
import { getDaysInMonth } from "date-fns";

export const Workdays = () => {
  const today = new Date();
  const daysInMonth = getDaysInMonth(today);

  return (
    <div>
      {/* <PulldownItem title="労働日数" content="0 / 0 日" /> */}
      <PulldownItem title="労働日数" content={`0 / ${daysInMonth} 日`} />
    </div>
  );
};
