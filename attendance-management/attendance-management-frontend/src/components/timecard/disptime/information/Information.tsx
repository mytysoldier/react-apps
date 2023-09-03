import React from "react";

type Props = {
  title: string;
  contents: string[];
};

export const Information: React.FC<Props> = ({ title, contents }) => {
  return (
    <>
      <div className="py-4 font-bold">{title}</div>
      <div className="py-4 border-y border-gray-500">
        {contents.length === 0 ? (
          <p>お知らせはありません。</p>
        ) : (
          <ul>
            {contents.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
