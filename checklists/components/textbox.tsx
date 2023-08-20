import { FC, KeyboardEventHandler, useState } from "react";
import styles from "../styles/TextBox.module.css";

type Props = {
  addItem?: (text: string) => void;
  deleteAll?: () => void;
};

const TextBox: FC<Props> = ({ addItem, deleteAll }) => {
  const [text, setText] = useState("");
  return (
    <div className={styles.grid}>
      <input
        className={styles.textbox}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            addItem(text);
            setText("");
          }
        }}
      ></input>
      <button
        className={styles.button}
        onClick={() => {
          addItem(text);
          setText("");
        }}
      >
        追加
      </button>
      <button className={styles.button} onClick={deleteAll}>
        リストクリア
      </button>
    </div>
  );
};

export default TextBox;
