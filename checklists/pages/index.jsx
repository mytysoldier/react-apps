import Head from "next/head";
import styles from "../styles/Home.module.css";
import Check_item from "../components/check_item";
import TextBox from "../components/textbox";
import { useState } from "react";

export default function Home() {
  const [itemList, setItemList] = useState([]);
  const addCheckListItem = (title) => {
    setItemList([
      ...itemList,
      <Check_item
        title={title}
        deleteItem={() =>
          setItemList(itemList.filter((item) => item.title !== title))
        }
      ></Check_item>,
    ]);
  };
  const deleteAllCheckListItem = () => {
    setItemList([]);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
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

        {itemList.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
