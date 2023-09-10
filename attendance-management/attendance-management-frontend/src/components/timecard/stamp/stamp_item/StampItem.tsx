"use client";

import CommonModal from "@/components/common/modal";
import React, { useState } from "react";

type Props = {
  text: string;
};

export const StampItem: React.FC<Props> = ({ text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOnClick = () => {};
  return (
    <div>
      <div
        className="w-32 h-32 bg-blue-500 rounded-full flex justify-center items-center text-white text-lg"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        {text}
      </div>
      <CommonModal isOpen={isModalOpen} onClose={() => {}} />
    </div>
  );
};
