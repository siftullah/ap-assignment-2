import { useRouter } from 'next/router';
import styles from '../../styles/Help.module.css';

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;
  const path = '/help' + (Array.isArray(slug) ? '/' + slug.join('/') : '');
  
  const page = {
    title: path,
    content: 'you are trying to reach ' + path
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{page.title}</h1>
      <div className={styles.content}>
        {page.content}
      </div>
    </div>
  );
} 