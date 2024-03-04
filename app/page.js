import Image from "next/image";
import Link from "next/link"
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/gallery/videos">Videos</Link>
      <Link href="/gallery/photos">Photos</Link>
      <Link href="/gallery/audio">Audios</Link>
    </main>
  );
}
