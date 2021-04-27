import UserLayout from "../../Component/Users/Layout";
import styles from "../../styles/Home.module.css";

export default function Home() {
  return (
    <UserLayout>
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

        <div className={styles.grid}>
          <a href="/admin" className={styles.card}>
            <h3>Admin Panel</h3>
            <p>Go to Admin Panel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a>Powered by </a>
      </footer>
      </UserLayout>
  );
}
