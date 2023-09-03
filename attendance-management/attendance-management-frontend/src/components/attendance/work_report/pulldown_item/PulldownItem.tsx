"use client";
import React, { ReactNode, useState } from "react";

type Props = {
  title: string;
  content: ReactNode;
};

export const PulldownItem: React.FC<Props> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="px-8 border-y border-gray-500">
      <div className="flex justify-between py-4">
        <span className="text-xl font-bold">{title}</span>
        <div onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </div>
      </div>
      {isOpen && <div className="py-4 text-lg font-bold">{content}</div>}
    </div>
  );
};
