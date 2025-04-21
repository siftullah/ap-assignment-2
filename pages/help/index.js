import { useRouter } from 'next/router';
import styles from '../../styles/Help.module.css';

export default function HelpPage() 
{
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>/help</h1>
      <div className={styles.content}>
        you are trying to reach /help route
      </div>
    </div>
  );
} 