import { FC, useState } from "react";
import styles from "../styles/CheckListItem.module.css";
import { db } from "../pages";

type Props = {
  title: string;
  isDone: boolean;
  deleteItem: (text: string) => void;
};

const CheckListItem: FC<Props> = ({ title, isDone, deleteItem }) => {
  const [isChecked, setIsChecked] = useState(isDone);
  return (
    <div className={styles.grid}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={async () => {
          const querySnapshot = await db
            .collection("todos")
            .where("title", "==", title)
            .get();
          querySnapshot.forEach(async (doc) => {
            // DBの指定ドキュメントを更新
            await doc.ref.update({ isDone: !isChecked });
          });
          setIsChecked(!isChecked);
        }}
      ></input>
      <span className={isChecked ? `${styles.done}` : `${styles.active}`}>
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
