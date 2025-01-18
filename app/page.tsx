
import styles from "./page.module.css";
import LoginForm from "./LoginForm";

export default function Home() {


  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
