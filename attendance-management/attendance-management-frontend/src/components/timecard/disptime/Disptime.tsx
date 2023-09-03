import { Alert } from "./alert/Alert";
import { Information } from "./information/Information";

export const Disptime = () => {
  return (
    <>
      <div className="text-xl">2022年10月18日(火)</div>
      <div className="flex items-end">
        <span className="text-5xl mr-2">17 : 22</span>
        <span className="text-xl">45</span>
      </div>
      <div className="mt-8">
        <Alert />
      </div>
      <div className="mt-8">
        <Information title="全体へのお知らせ" contents={[]} />
      </div>
      <div className="mt-8">
        <Information title="あなたへのお知らせ" contents={[]} />
      </div>
    </>
  );
};
