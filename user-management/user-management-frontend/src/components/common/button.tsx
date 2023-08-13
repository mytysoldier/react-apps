import React from "react";

type Props = {
  text: string;
  onClick: () => void;
};

export const Button: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white bg-blue-500 rounded w-40 h-8"
    >
      {text}
    </button>
  );
};
