import { FC, useState } from "react";

type Props = {
  title: string;
  deleteItem: (text: string) => void;
};

const CheckListItem: FC<Props> = ({ title, deleteItem }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      ></input>
      <span
        style={{
          color: checked ? "grey" : "black",
          textDecorationLine: checked ? "line-through" : "none",
        }}
      >
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
