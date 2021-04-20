import Admin from "../../Component/Layout/Admin"
import styles from "../../styles/Home.module.css";
import Link from "next/link"

export default function Home() {
  return (
    <Admin title="Admin Panel">
      <main className={styles.main}>
        <h1 className={styles.title}>VHS Admin Panel</h1>

        {/* <div className={styles.grid}>
          <a href="/admin/movies" className={styles.card}>
            <h3>Movies Available</h3>
            <p>View a list of all movies available.</p>
          </a>
        </div> */}

        <div className={styles.grid}>
          <Link href="/admin/users"><a className={styles.card}>
            <h3>Users</h3>
            <p>See User List.</p>
          </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a>Powered by </a>
      </footer>
    </Admin>
  );
}
