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
      const user: User = responseData;
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
    <>
      <h2>ユーザー詳細</h2>
      <div>
        <table>
          <tbody>
            <tr>
              <td>ユーザーID</td>
              <td>{user.id}</td>
            </tr>
            <tr>
              <td>ユーザー名</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>ユーザー種別</td>
              <td>{user.type}</td>
            </tr>
            <tr>
              <td>ステータス</td>
              <td>{user.status}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <button>削除</button>
        <Link href={`/user_detail/user_edit?id=${user.id}`}>
          <button>編集</button>
        </Link>
      </div>

      <h2>
        <Link href="/">戻る</Link>
      </h2>
    </>
  );
};

export default UserDetail;
