import { FC, useState } from "react";

type Props = {
  onSubmit?: () => void;
};

const TextBox: FC<Props> = ({ onSubmit }) => {
  return (
    <div>
      <input type="text"></input>
      <button onClick={onSubmit}>追加</button>
    </div>
  );
};

export default TextBox;
