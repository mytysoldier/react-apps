import Head from "next/head";
import styles from "../styles/Home.module.css";
import TextBox from "../components/textbox";
import { useState } from "react";
import CheckListItem from "../components/check_list_item";

export default function Home() {
  const [titleList, setTitleList] = useState<string[]>([]);
  const addCheckListItem = (title: string) => {
    if (titleList.includes(title)) {
      // 同一タイトルのチェックリストが登録済みなら追加しない
      return;
    }
    setTitleList([...titleList, title]);
  };
  const deleteAllCheckListItem = () => {
    setTitleList([]);
  };
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
