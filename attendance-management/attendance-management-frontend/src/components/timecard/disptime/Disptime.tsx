import { Alert } from "./alert/Alert";
import { CurrentTime } from "./currenttime/CurrentTime";
import { Information } from "./information/Information";

export const Disptime = () => {
  return (
    <>
      <CurrentTime />
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
