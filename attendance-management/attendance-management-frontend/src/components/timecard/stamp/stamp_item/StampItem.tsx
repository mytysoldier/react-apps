"use client";

type Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const StampItem: React.FC<Props> = ({ text, onClick, disabled }) => {
  return (
    <div>
      <div
        className={`w-32 h-32 bg-blue-500 rounded-full flex justify-center items-center text-white text-lg ${
          disabled ? "bg-gray-500" : ""
        }`}
        onClick={!disabled ? onClick : () => {}}
      >
        {text}
      </div>
    </div>
  );
};
