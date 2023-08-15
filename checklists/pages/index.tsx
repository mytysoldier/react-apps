import Head from "next/head";
import styles from "../styles/Home.module.css";
import TextBox from "../components/textbox";
import { useEffect, useState } from "react";
import CheckListItem from "../components/check_list_item";
// import firebase from "firebase/app";
import firebase from "firebase/compat/app";
// import "firebase/firestore";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default function Home() {
  const [titleList, setTitleList] = useState<string[]>([]);
  const addCheckListItem = async (title: string) => {
    if (titleList.includes(title)) {
      // 同一タイトルのチェックリストが登録済みなら追加しない
      return;
    }
    // DBにデータ登録
    await db.collection("todos").add({
      title: title,
    });
    // 画面を更新
    setTitleList([...titleList, title]);
  };
  const deleteAllCheckListItem = async () => {
    const todoDocs = (await db.collection("todos").get()).docs;
    // DBからデータ削除
    todoDocs.forEach(async (doc) => {
      await doc.ref.delete();
    });
    // 画面を更新
    setTitleList([]);
  };

  useEffect(() => {
    const todoTitles = [] as string[];

    async function fetchTodos() {
      const todoDocs = (await db.collection("todos").get()).docs;
      todoDocs.forEach((doc) => {
        const data = doc.data();
        const title = data.title as string;
        todoTitles.push(title);
      });
      setTitleList([...todoTitles]);
    }

    // 画面初回描画時に登録されているTODOデータを読み込む
    fetchTodos();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Checklists App</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>チェックリスト管理</h1>

        <p className={styles.description}>
          追加したいチェックリストを入力してください。
        </p>

        <TextBox
          addItem={addCheckListItem}
          deleteAll={deleteAllCheckListItem}
        />

        {titleList.map((title, index) => (
          <div key={index}>
            <CheckListItem
              title={title}
              deleteItem={() =>
                setTitleList(
                  titleList.filter(
                    (filtered_title: string) => filtered_title !== title
                  )
                )
              }
            ></CheckListItem>
          </div>
        ))}
      </main>
    </div>
  );
}
