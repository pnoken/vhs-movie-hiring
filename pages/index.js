import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          VHS <a href="">Movie Project</a>
        </h1>

        <div className={styles.grid}>
          <a href="/user/movies" className={styles.card}>
            <h3>Movies Available</h3>
            <p>View a list of all movies available.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a>Powered by </a>
      </footer>
    </div>
  );
}
