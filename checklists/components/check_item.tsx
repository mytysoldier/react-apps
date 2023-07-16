import { FC, useState } from "react";

type Props = {
  title?: string;
};

const Check_item: FC<Props> = ({ title }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      ></input>
      {title}
    </div>
  );
};

export default Check_item;
