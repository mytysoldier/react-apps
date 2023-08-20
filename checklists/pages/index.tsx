import Head from "next/head";
import styles from "../styles/Home.module.css";
import TextBox from "../components/textbox";
import { useEffect, useState } from "react";
import CheckListItem from "../components/check_list_item";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Todo } from "../type/todo";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const addCheckListItem = async (title: string) => {
    if (todoList.find((todo) => todo.title === title)) {
      // 同一タイトルのチェックリストが登録済みなら追加しない
      return;
    }
    // DBにデータ登録
    await db.collection("todos").add({
      title: title,
      isDone: false,
    });
    // 画面を更新
    setTodoList([...todoList, { title: title, isDone: false }]);
  };
  const deleteAllCheckListItem = async () => {
    const todoDocs = (await db.collection("todos").get()).docs;
    // DBからデータ削除
    todoDocs.forEach(async (doc) => {
      await doc.ref.delete();
    });
    // 画面を更新
    setTodoList([]);
  };

  useEffect(() => {
    const todoTitles = [] as Todo[];

    async function fetchTodos() {
      const todoDocs = (await db.collection("todos").get()).docs;
      todoDocs.forEach((doc) => {
        const data = doc.data();
        const title = data.title as string;
        const isDone = data.isDone as boolean;
        todoTitles.push({ title, isDone });
      });
      setTodoList([...todoTitles]);
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

        {todoList.map((todo, index) => (
          <div key={index}>
            <CheckListItem
              title={todo.title}
              isDone={todo.isDone}
              deleteItem={async () => {
                const querySnapshot = await db
                  .collection("todos")
                  .where("title", "==", todo.title)
                  .get();
                querySnapshot.forEach(async (doc) => {
                  // DBから指定のドキュメントを削除
                  await doc.ref.delete();
                });
                // 画面に反映
                setTodoList(
                  todoList.filter(
                    (filtered_todo: Todo) => filtered_todo.title !== todo.title
                  )
                );
              }}
            ></CheckListItem>
          </div>
        ))}
      </main>
    </div>
  );
}
