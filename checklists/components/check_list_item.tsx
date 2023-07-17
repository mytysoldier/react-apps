import { FC, useState } from "react";
import styles from "../styles/CheckListItem.module.css";

type Props = {
  title: string;
  deleteItem: (text: string) => void;
};

const CheckListItem: FC<Props> = ({ title, deleteItem }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={styles.grid}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      ></input>
      <span className={checked ? `${styles.done}` : `${styles.active}`}>
        {title}
      </span>
      <button
        onClick={() => {
          deleteItem(title);
        }}
      >
        削除
      </button>
    </div>
  );
};

export default CheckListItem;
