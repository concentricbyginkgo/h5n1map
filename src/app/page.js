import Topbar from "@/components/topbar";
import Container from "@/components/container";
import styles from "@/components/topbar.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="home page-template-default page page-id-2221 is--dark-mode has--green-accent is-initial-load" style={{position: "relative", minHeight: "100%", top: "0px"}}>
        <Topbar />
      </div>
      <Container />
    </main>
  );
}
