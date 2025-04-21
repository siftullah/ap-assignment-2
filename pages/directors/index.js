import useSWR from 'swr';
import styles from '../../styles/Directors.module.css';
import Link from 'next/link';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Directors() {
  const { data: directors, error } = useSWR('/api/directors', fetcher);

  if (error) return <div className={styles.error}>Failed to load directors</div>;
  if (!directors) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>Movie Directors</h1>
      
      <div className={styles.directorList}>
        {directors.map((director) => (
          <Link key={director.id} href={`/directors/${director.id}`} className={styles.directorLink}>
            <div className={styles.directorCard}>
              <h2 className={styles.directorName}>{director.name}</h2>
              <p className={styles.biography}>{director.biography}</p>
              <p className={styles.movieCount}>Total Movies: {director.movies_count}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
