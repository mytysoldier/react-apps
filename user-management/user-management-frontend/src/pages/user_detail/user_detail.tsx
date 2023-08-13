import { Button } from "@/components/common/button";
import { User } from "@/types/user";
import { GetServerSideProps } from "next";
import Link from "next/link";

type Props = {
  user?: User | null;
};

// user_idをキーにユーザーデータを非同期取得
const getData = async (user_id: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/user?id=${user_id}`);
    const responseData = await response.json();

    if (responseData) {
      // レスポンスがnullでなければUser型に変換
      const { _id, ...rest } = JSON.parse(responseData);
      const user: User = { id: _id.$oid, ...rest };
      return user;
    } else {
      return null;
    }
  } catch (e) {
    console.error("APIリクエストエラー:", e);
  }
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { query } = context;
  const { id } = query;

  // データを取得
  const user = await getData(id as string);

  return {
    props: {
      user: user || null,
    },
  };
};

const UserDetail: React.FC<Props> = ({ user }) => {
  if (!user) {
    return (
      <>
        <div>ユーザーが見つかりません。</div>
        <div>
          <Link href="/user_detail/user_edit">
            <button>編集</button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="h-screen bg-slate-300">
      <div className="grid">
        <div className="w-4/5 bg-white rounded place-self-center px-4 py-4">
          <div className="flex justify-between pb-4 border-b-2">
            <div className="text-lg">ユーザー詳細</div>
            <div>
              <Link href="/">
                <Button text="戻る" onClick={() => {}} />
              </Link>
            </div>
          </div>
          <div className="py-4">
            <table className="table-auto border border-slate-300 w-full">
              <tbody>
                <tr className="h-14">
                  <td className="bg-slate-300">ユーザーID</td>
                  <td>{user.id}</td>
                </tr>
                <tr className="h-14">
                  <td className="bg-slate-300">ユーザー名</td>
                  <td>{user.name}</td>
                </tr>
                <tr className="h-14">
                  <td className="bg-slate-300">ユーザー種別</td>
                  <td>{user.type}</td>
                </tr>
                <tr className="h-14">
                  <td className="bg-slate-300">ステータス</td>
                  <td>{user.status}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <div>
              <Link href={`/user_detail/user_edit?id=${user.id}`}>
                <Button text="編集" onClick={() => {}} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
