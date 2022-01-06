import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <div className={styles.container}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/blocks.css/dist/blocks.min.css"
      />

      <title>Simple Search App</title>

      <main className={styles.main}>
        <Dashboard></Dashboard>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
