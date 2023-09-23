"use client";

type Props = {
  text: string;
  onClick?: () => void;
};

export const StampItem: React.FC<Props> = ({ text, onClick }) => {
  return (
    <div>
      <div
        className="w-32 h-32 bg-blue-500 rounded-full flex justify-center items-center text-white text-lg"
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
};
