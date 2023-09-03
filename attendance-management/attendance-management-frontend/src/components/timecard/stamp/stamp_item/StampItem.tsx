import React from "react";

type Props = {
  text: string;
};

export const StampItem: React.FC<Props> = ({ text }) => {
  return (
    <div className="w-32 h-32 bg-blue-500 rounded-full flex justify-center items-center text-white text-lg">
      {text}
    </div>
  );
};
