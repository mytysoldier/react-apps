import { User } from "@/types/user";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";

type Props = {
  user?: User;
};

// ダミーデータの非同期取得
const getData = async (user_id: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/user?id=${user_id}`);
    const jsonData = (await response.json()) as User;
    return jsonData;
  } catch (e) {
    console.error("APIリクエストエラー:", e);
    // return {};
  }
  // // 仮に非同期処理をここで実行し、データを取得するとします
  // // この例ではダミーデータを返す
  // const dummyData: User[] = [
  //   { id: "1", name: "John Doe", type: "一般", status: "有効" },
  //   { id: "2", name: "Jane Smith", type: "一般", status: "有効" },
  //   { id: "3", name: "Bob Johnson", type: "一般", status: "有効" },
  // ];
  // return dummyData[0];
};

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext
) => {
  // const { id } = context.params?.id as string;
  const { id } = context.params?.id || "";
  // データを取得
  const user = await getData(id as string);

  return {
    props: {
      user,
    },
  };
};

const UserDetail: React.FC<Props> = ({ user }) => {
  return (
    <>
      <h2>ユーザー詳細</h2>
      <div>
        <table>
          <tbody>
            <tr>
              <td>ユーザーID</td>
              <td>{user?.id}</td>
            </tr>
            <tr>
              <td>ユーザー名</td>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <td>ユーザー種別</td>
              <td>{user?.type}</td>
            </tr>
            <tr>
              <td>ステータス</td>
              <td>{user?.status}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <button>削除</button>
        <Link href="/user_detail/user_edit">
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
