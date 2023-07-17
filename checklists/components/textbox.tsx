import { FC, MouseEventHandler, useState } from "react";

type Props = {
  onSubmit?: (text: string) => void;
};

const TextBox: FC<Props> = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const handleOnClickAdd = (text: string) => {
    onSubmit(text);
  };
  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button onClick={() => handleOnClickAdd(text)}>追加</button>
    </>
  );
};

export default TextBox;
