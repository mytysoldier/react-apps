import { FC, MouseEventHandler, useState } from "react";

type Props = {
  addItem?: (text: string) => void;
  deleteAll?: () => void;
};

const TextBox: FC<Props> = ({ addItem, deleteAll }) => {
  const [text, setText] = useState("");
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button onClick={() => addItem(text)}>追加</button>
      <button onClick={deleteAll}>すべてクリア</button>
    </div>
  );
};

export default TextBox;
