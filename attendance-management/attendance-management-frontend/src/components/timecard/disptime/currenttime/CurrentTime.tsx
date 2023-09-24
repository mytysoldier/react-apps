import { format } from "date-fns";
import ja from "date-fns/locale/ja";
import { useEffect, useState } from "react";

export const CurrentTime = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // 1秒ごとに現在時刻を更新する
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // コンポーネントがアンマウントされたときにインターバルをクリアする
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <div className="text-xl">
        {format(currentDate, "yyyy年MM月dd日(E)", { locale: ja })}
      </div>
      <div className="flex items-end">
        <span className="text-5xl mr-2">{format(currentDate, "HH : mm")}</span>
        <span className="text-xl">{format(currentDate, "ss")}</span>
      </div>
    </div>
  );
};
