import { useRouter } from 'next/router';
import styles from '../styles/NotFound.module.css';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          The page you are looking for does not exist.
        </p>
        <button
          onClick={() => router.push('/')}
          className={styles.homeButton}
        >
          Go Home
        </button>
      </div>
    </div>
  );
} 