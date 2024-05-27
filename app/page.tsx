import styles from "./page.module.css";
import Battery from "@/components/battery/page";
import Clock from "@/components/clock/page";

export default function Home() {
  return (
    <>
      <main className={styles['main']}>
        <Clock />
      </main>
      <Battery />
    </>
  );
}
